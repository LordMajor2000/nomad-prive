import { auth } from "@/auth"
import createIntlMiddleware from "next-intl/middleware"
import { routing } from "@/i18n/routing"
import { NextResponse, type NextRequest } from "next/server"

const intlMiddleware = createIntlMiddleware(routing)

export default auth((req: NextRequest & { auth?: unknown }) => {
  const { pathname } = req.nextUrl

  // Handle client portal auth
  const isClientRoute = pathname.startsWith("/client")
  const isLoginPage = pathname === "/client/login"
  const isLoggedIn = !!(req as { auth?: unknown }).auth

  if (isClientRoute && !isLoginPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/client/login", req.url))
  }

  // Don't apply intl middleware to client routes or API routes
  if (isClientRoute || pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  return intlMiddleware(req)
})

export const config = {
  matcher: [
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
}
