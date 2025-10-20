import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE;
const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASS;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const pass = req.headers["x-admin-pass"];

  if (pass !== adminPass) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === "DELETE") {
      const id = req.query.id;
      const { error } = await supabase
        .from("registrations")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return res.status(200).json({ success: true });
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("❌ Admin API Error:", err);
    res.status(500).json({ error: err.message });
  }
}
