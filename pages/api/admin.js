import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Nur POST erlaubt" });
  }

  const { pass } = req.body;

  if (pass !== process.env.ADMIN_PASS) {
    return res.status(401).json({ error: "Falsches Passwort" });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE
  );

  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ Supabase-Fehler:", error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ data });
}
