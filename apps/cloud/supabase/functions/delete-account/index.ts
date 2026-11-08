import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { ...cors, "Content-Type": "application/json" } });

  try {
    const body = await req.json().catch(() => ({}));
    if (body?.confirm !== true) return new Response(JSON.stringify({ error: "Explicit confirmation is required." }), { status: 400, headers: { ...cors, "Content-Type": "application/json" } });

    const url = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const authHeader = req.headers.get("Authorization");
    if (!url || !anonKey || !serviceKey || !authHeader) throw new Error("Account deletion is not configured.");

    const userClient = createClient(url, anonKey, { global: { headers: { Authorization: authHeader } }, auth: { persistSession: false } });
    const { data: userData, error: userError } = await userClient.auth.getUser();
    if (userError || !userData.user) throw new Error("A valid signed-in session is required.");

    const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
    const { error: deleteError } = await admin.auth.admin.deleteUser(userData.user.id);
    if (deleteError) throw deleteError;

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...cors, "Content-Type": "application/json" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Account deletion failed.";
    return new Response(JSON.stringify({ error: message }), { status: 400, headers: { ...cors, "Content-Type": "application/json" } });
  }
});
