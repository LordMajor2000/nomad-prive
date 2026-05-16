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

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAdminSession(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params

  const { data: user } = await supabaseAdmin
    .from("users")
    .select("id, name, email, referral_code, referred_by, created_at")
    .eq("id", id)
    .single()

  const { data: trips } = await supabaseAdmin
    .from("trips")
    .select("id, status, created_at, data")
    .eq("user_id", id)
    .order("created_at", { ascending: false })

  return NextResponse.json({ user, trips: trips ?? [] })
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAdminSession(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const body = await req.json()

  const { error } = await supabaseAdmin
    .from("users")
    .update({ name: body.name, email: body.email })
    .eq("id", id)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}
