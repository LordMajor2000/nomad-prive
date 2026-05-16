import { NextRequest, NextResponse } from "next/server"
import { createHmac } from "node:crypto"

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const cookieValue = createHmac("sha256", process.env.AUTH_SECRET!)
    .update("nomad-admin-session")
    .digest("hex")

  const res = NextResponse.json({ ok: true })
  res.cookies.set("admin_session", cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 nap
    path: "/",
  })

  return res
}
