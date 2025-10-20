import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

export default function AdminPage() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadRegistrations() {
    setLoading(true);
    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("❌ Fehler beim Laden:", error);
      setError(error.message);
    } else {
      setRegistrations(data);
    }
    setLoading(false);
  }

  function exportCSV() {
    const header = Object.keys(registrations[0] || {}).join(";");
    const rows = registrations
      .map((r) =>
        Object.values(r)
          .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
          .join(";")
      )
      .join("\n");
    const csv = `${header}\n${rows}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "registrations.csv";
    link.click();
  }

  useEffect(() => {
    loadRegistrations();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🧾 Admin-Dashboard – Röpische Spiele</h1>

      {loading && <p>⏳ Lade Daten...</p>}
      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      {!loading && !error && (
        <>
          <button
            onClick={exportCSV}
            style={{
              background: "#2563eb",
              color: "white",
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              marginBottom: "1rem",
            }}
          >
            📤 Export als CSV
          </button>

          <table
            border="1"
            cellPadding="8"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              fontSize: "0.9rem",
            }}
          >
            <thead style={{ background: "#f0f0f0" }}>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Adresse</th>
                <th>Telefon</th>
                <th>E-Mail</th>
                <th>Wie gefunden</th>
                <th>Kontaktperson</th>
                <th>Datum</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.name}</td>
                  <td>{r.address}</td>
                  <td>{r.phone}</td>
                  <td>{r.email}</td>
                  <td>{r.how_found}</td>
                  <td>{r.contact_person}</td>
                  <td>
                    {r.created_at
                      ? new Date(r.created_at).toLocaleString("de-DE")
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
