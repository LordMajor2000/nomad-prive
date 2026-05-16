import { supabaseAdmin } from "@/lib/supabase"
import AdminDashboardClient from "@/components/admin/AdminDashboardClient"

export default async function AdminDashboard() {
  const { data: users } = await supabaseAdmin
    .from("users")
    .select("id, email, name, referral_code, referred_by, created_at")
    .order("created_at", { ascending: false })

  const { data: trips } = await supabaseAdmin
    .from("trips")
    .select("id, user_id, status, created_at, data")
    .order("created_at", { ascending: false })

  return <AdminDashboardClient users={users ?? []} trips={trips ?? []} />
}
