import { createClient } from "@supabase/supabase-js";

// === Supabase-Verbindung ===
// Client wird mit Service Role Key erstellt (volle Rechte)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE;
const adminPass = process.env.ADMIN_PASS;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// === API-Handler ===
export default async function handler(req, res) {
  const pass = req.headers["x-admin-pass"];

  // === Passwortprüfung ===
  if (!pass || pass !== adminPass) {
    console.warn("❌ Ungültiges Admin-Passwort oder fehlt.");
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // === ALLE EINTRÄGE LADEN ===
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return res.status(200).json(data);
    }

    // === EINTRAG LÖSCHEN ===
    if (req.method === "DELETE") {
      const id = req.query.id;
      if (!id) {
        return res.status(400).json({ error: "ID fehlt" });
      }

      const { error } = await supabase
        .from("registrations")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return res.status(200).json({ success: true });
    }

    // === Andere Methoden blockieren ===
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("💥 Admin API Fehler:", err);
    return res.status(500).json({ error: err.message });
  }
}
