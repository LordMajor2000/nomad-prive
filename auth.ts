import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        // Admin
        if (
          credentials.email === process.env.ADMIN_EMAIL &&
          credentials.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "admin", name: "Admin", email: credentials.email as string, role: "admin" }
        }

        // Supabase — dynamic import keeps bcryptjs off the edge runtime
        const { supabaseAdmin } = await import("@/lib/supabase")
        const bcrypt = await import("bcryptjs")

        const { data: user } = await supabaseAdmin
          .from("users")
          .select("id, email, name, password_hash, referral_code")
          .eq("email", credentials.email)
          .single()

        if (!user) return null

        // Demo fallback: no password hash set yet
        if (!user.password_hash) {
          if (
            credentials.email === "client@nomadprive.com" &&
            credentials.password === "nomad2024"
          ) {
            return {
              id: user.id,
              name: user.name ?? "Client",
              email: user.email,
              role: "client",
              referralCode: user.referral_code,
            }
          }
          return null
        }

        const valid = await bcrypt.default.compare(
          credentials.password as string,
          user.password_hash
        )
        if (!valid) return null

        return {
          id: user.id,
          name: user.name ?? "Client",
          email: user.email,
          role: "client",
          referralCode: user.referral_code,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as Record<string, unknown>).role
        token.userId = user.id
        token.referralCode = (user as Record<string, unknown>).referralCode
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        const u = session.user as unknown as Record<string, unknown>
        u.role = token.role
        u.userId = token.userId
        u.referralCode = token.referralCode
      }
      return session
    },
  },
  pages: { signIn: "/client/login" },
  session: { strategy: "jwt" },
})
