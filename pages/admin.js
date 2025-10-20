import { useState } from "react";

export default function AdminPage() {
  const [registrations, setRegistrations] = useState([]);
  const [inputPass, setInputPass] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    setError(null);

    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pass: inputPass }),
    });

    const result = await res.json();
    if (res.ok) {
      setAuthenticated(true);
      setRegistrations(result.data || []);
    } else {
      setError(result.error || "Falsches Passwort");
    }
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
    const blob = new Blob([`${header}\n${rows}`], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "registrations.csv";
    link.click();
  }

  if (!authenticated) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontFamily: "sans-serif",
        }}
      >
        <h2>🔒 Admin-Login</h2>
        <form onSubmit={handleLogin} style={{ display: "flex", gap: "8px" }}>
          <input
            type="password"
            placeholder="Admin-Passwort"
            value={inputPass}
            onChange={(e) => setInputPass(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              width: "200px",
            }}
          />
          <button
            type="submit"
            style={{
              background: "#2563eb",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🧾 Admin-Dashboard – Röpische Spiele</h1>
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
    </div>
  );
}
