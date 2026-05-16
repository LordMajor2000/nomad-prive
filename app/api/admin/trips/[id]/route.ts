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

  const { data } = await supabaseAdmin
    .from("trips")
    .select("*, users(id, name, email)")
    .eq("id", id)
    .single()

  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAdminSession(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const { status, data } = await req.json()

  const update: Record<string, unknown> = {}
  if (status !== undefined) update.status = status
  if (data !== undefined) update.data = data

  const { error } = await supabaseAdmin.from("trips").update(update).eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}
