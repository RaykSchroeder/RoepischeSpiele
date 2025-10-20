import { createClient } from "@supabase/supabase-js";

// === Verbindung zu Supabase herstellen ===
// ⚠️ Im Servercode verwenden wir den Service-Key,
// damit RLS (Row Level Security) keine Inserts blockiert.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE;

// === Sicherheitsprüfung ===
if (!supabaseUrl || !supabaseKey) {
  console.error("❌ FEHLER: Supabase-Umgebungsvariablen fehlen!");
}

// === Supabase-Client ===
const supabase = createClient(supabaseUrl, supabaseKey);

// === API-Handler ===
export default async function handler(req, res) {
  console.log("📩 API /api/register aufgerufen", req.method);

  try {
    // Nur POST-Anfragen zulassen
    if (req.method !== "POST") {
      console.warn("⚠️ Ungültige Methode:", req.method);
      return res.status(405).json({ error: "Nur POST-Anfragen erlaubt." });
    }

    // Eingehende Daten
    const { name, address, phone, email, how_found, contact_person } = req.body;
    console.log("📦 Empfangen:", {
      name,
      address,
      phone,
      email,
      how_found,
      contact_person,
    });

    // Pflichtfelder prüfen
    if (!name || !email) {
      console.warn("⚠️ Fehlende Pflichtfelder:", { name, email });
      return res
        .status(400)
        .json({ error: "Name und E-Mail sind erforderlich." });
    }

    // === Datensatz in Supabase einfügen ===
    const { data, error } = await supabase
      .from("registrations")
      .insert([{ name, address, phone, email, how_found, contact_person }])
      .select();

    // === Fehlerbehandlung Supabase ===
    if (error) {
      console.error("❌ Supabase Insert Error:", error);
      return res.status(500).json({
        error: error.message,
        details: error.details || null,
        hint: error.hint || null,
      });
    }

    // === Erfolg ===
    console.log("✅ Datensatz erfolgreich gespeichert:", data);
    return res
      .status(200)
      .json({ message: "Registrierung erfolgreich!", record: data });
  } catch (err) {
    // === Serverfehler ===
    console.error("💥 Unerwarteter Serverfehler:", err);
    return res
      .status(500)
      .json({ error: err.message || "Unbekannter Serverfehler" });
  }
}
