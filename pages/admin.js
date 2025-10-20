import { useState } from "react";

export default function AdminPage() {
  const [pass, setPass] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("idle");

  async function loadRegistrations() {
    setStatus("loading");
    try {
      const res = await fetch("/api/admin-registrations", {
        headers: { "x-admin-pass": pass },
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Fehler beim Laden");
      setRegistrations(data);
      setAuthorized(true);
      setStatus("success");
    } catch (err) {
      console.error("Fehler beim Laden:", err);
      setStatus("error");
    }
  }

  async function deleteEntry(id) {
    if (!confirm("Diesen Eintrag wirklich löschen?")) return;
    try {
      const res = await fetch(`/api/admin-registrations?id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-pass": pass },
      });
      if (res.ok) {
        setRegistrations((prev) => prev.filter((r) => r.id !== id));
      } else {
        alert("Fehler beim Löschen");
      }
    } catch (err) {
      console.error(err);
      alert("Fehler beim Löschen");
    }
  }

  function exportCSV() {
    const headers = [
      "Name",
      "Adresse",
      "Telefon",
      "E-Mail",
      "Wie gefunden",
      "Kontaktperson",
      "Erstellt am",
    ];
    const rows = registrations.map((r) => [
      r.name,
      r.address,
      r.phone,
      r.email,
      r.how_found,
      r.contact_person,
      r.created_at,
    ]);
    const csv = [headers, ...rows].map((row) => row.join(";")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "registrierungen.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = registrations.filter((r) =>
    [r.name, r.email, r.contact_person]
      .some((val) => val?.toLowerCase().includes(search.toLowerCase()))
  );

  if (!authorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-white">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center border border-gray-100">
          <h1 className="text-2xl font-bold mb-4 text-orange-600">
            🔐 Admin Login
          </h1>
          <input
            type="password"
            placeholder="Admin-Passwort"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          />
          <button
            onClick={loadRegistrations}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg shadow-md w-full mt-4 transition"
          >
            Anmelden
          </button>
          {status === "error" && (
            <p className="text-red-600 mt-3 font-medium">
              ❌ Passwort falsch oder keine Berechtigung
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <header className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-4 shadow-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4">
          <h1 className="text-xl md:text-2xl font-bold">
            🧭 Adminbereich – Röpische Spiele 2025
          </h1>
          <button
            onClick={() => {
              setAuthorized(false);
              setPass("");
            }}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg"
          >
            Abmelden
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto p-6 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
          <input
            placeholder="🔍 Suche nach Name, E-Mail oder Kontaktperson..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-2/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          />
          <button
            onClick={exportCSV}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition"
          >
            📤 Exportieren
          </button>
        </div>

        {filtered.length === 0 ? (
          <p className="text-gray-600 text-center mt-10">
            Keine Einträge gefunden.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-md">
              <thead className="bg-orange-100">
                <tr>
                  <th className="p-3 text-left font-semibold">Name</th>
                  <th className="p-3 text-left font-semibold">E-Mail</th>
                  <th className="p-3 text-left font-semibold">Telefon</th>
                  <th className="p-3 text-left font-semibold">Wie gefunden</th>
                  <th className="p-3 text-left font-semibold">Kontakt</th>
                  <th className="p-3 text-right font-semibold">Aktion</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-t hover:bg-orange-50">
                    <td className="p-3">{r.name}</td>
                    <td className="p-3">{r.email}</td>
                    <td className="p-3">{r.phone}</td>
                    <td className="p-3">{r.how_found}</td>
                    <td className="p-3">{r.contact_person}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => deleteEntry(r.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
