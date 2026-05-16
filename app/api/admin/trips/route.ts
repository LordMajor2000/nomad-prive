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

export async function POST(req: NextRequest) {
  if (!checkAdminSession(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { user_id, status, data } = await req.json()

  if (!user_id || !data) {
    return NextResponse.json({ error: "Hiányzó adatok." }, { status: 400 })
  }

  const { data: trip, error } = await supabaseAdmin
    .from("trips")
    .insert({ user_id, status: status ?? "Confirmed", data })
    .select("id")
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ id: trip.id })
}
