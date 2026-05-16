import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import bcrypt from "bcryptjs"
import { createHmac } from "crypto"

function checkAdminSession(req: NextRequest): boolean {
  const session = req.cookies.get("admin_session")
  if (!session) return false
  const expected = createHmac("sha256", process.env.AUTH_SECRET!)
    .update("nomad-admin-session")
    .digest("hex")
  return session.value === expected
}

function generateReferralCode(name: string): string {
  const part = name.split(" ").pop()?.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 6) ?? "CLIENT"
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `NP-${part}-${rand}`
}

export async function POST(req: NextRequest) {
  if (!checkAdminSession(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { name, email, password, referred_by } = await req.json()

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Hiányzó mezők." }, { status: 400 })
  }

  const password_hash = await bcrypt.hash(password, 12)
  const referral_code = generateReferralCode(name)

  const { data, error } = await supabaseAdmin
    .from("users")
    .insert({ name, email, password_hash, referral_code, referred_by })
    .select("id, referral_code")
    .single()

  if (error) {
    const msg = error.message.includes("unique") ? "Ez az email már létezik." : error.message
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  return NextResponse.json({ id: data.id, referralCode: data.referral_code })
}
