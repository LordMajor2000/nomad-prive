import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { createHmac } from "node:crypto"

function checkAdminSession(req: NextRequest): boolean {
  const session = req.cookies.get("admin_session")
  if (!session) return false
  const expected = createHmac("sha256", process.env.AUTH_SECRET!)
    .update("nomad-admin-session")
    .digest("hex")
  return session.value === expected
}

export async function GET(req: NextRequest) {
  if (!checkAdminSession(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data } = await supabaseAdmin
    .from("users")
    .select("id, name, email")
    .order("name")

  return NextResponse.json(data ?? [])
}
