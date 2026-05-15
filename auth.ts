import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        // Demo client — in production this would check a database
        if (
          credentials.email === "client@nomadprive.com" &&
          credentials.password === "nomad2024"
        ) {
          return { id: "1", name: "Demo Client", email: "client@nomadprive.com" }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/client/login",
  },
  session: { strategy: "jwt" },
})
