import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Nur POST erlaubt" });

  const { name, address, phone, email } = req.body;

  if (!name || !email)
    return res.status(400).json({ error: "Name und E-Mail sind erforderlich." });

  const { error } = await supabase.from("registrations").insert([
    { name, address, phone, email },
  ]);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ message: "Registrierung erfolgreich!" });
}

