import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { createClient } from "@supabase/supabase-js";
import loesungen from "../components/loesunggeoquiz";

const AdminMap = dynamic(() => import("../components/GeoQuizAdminMap"), {
  ssr: false,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export default function RSGeoQuizAdmin() {
  const [entries, setEntries] = useState([]);
  const [visible, setVisible] = useState([]);
  const [status, setStatus] = useState("⏳ Lade Einträge …");
  const [runde, setRunde] = useState(loesungen[0]);
  const [rundeIndex, setRundeIndex] = useState(0);
  const [isReplaying, setIsReplaying] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  // 🔄 Daten laden
  const loadData = async () => {
    const { data, error } = await supabase
      .from("geoquiz_answers")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) {
      console.error(error);
      setStatus("❌ Fehler beim Laden der Daten");
    } else {
      setEntries(data ?? []);
      setStatus(data?.length ? "" : "ℹ️ Noch keine Einträge");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ▶️ Replay-Animation
  const startReplay = () => {
    if (entries.length === 0) return;
    setIsReplaying(true);
    setVisible([]);
    setShowSolution(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisible(entries.slice(0, i));
      if (i >= entries.length) {
        clearInterval(interval);
        setTimeout(() => setShowSolution(true), 800);
        setIsReplaying(false);
      }
    }, 1000);
  };

  // ▶️ Runde starten → löscht alte Punkte und aktiviert Spiel
  const startRound = async () => {
    if (!confirm("Alle bisherigen Punkte löschen und neue Runde starten?")) return;

    const { error: delErr } = await supabase.from("geoquiz_answers").delete().neq("id", 0);
    if (delErr) return alert("❌ Fehler beim Löschen!");

    const { error: stateErr } = await supabase
      .from("geoquiz_state")
      .update({ is_active: true, updated_at: new Date().toISOString() })
      .eq("id", 1);
    if (stateErr) console.error(stateErr);

    setEntries([]);
    setVisible([]);
    setShowSolution(false);
    setStatus("🟢 Runde läuft – Spieler können tippen!");
  };

  // ⏹ Runde stoppen → Spieler sperren
  const stopRound = async () => {
    const { error: stateErr } = await supabase
      .from("geoquiz_state")
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq("id", 1);
    if (stateErr) console.error(stateErr);

    setStatus("⛔ Runde gestoppt – Spieler gesperrt!");
  };

  // ⏭️ Nächste Runde
  const nextRound = () => {
    const next = (rundeIndex + 1) % loesungen.length;
    setRunde(loesungen[next]);
    setRundeIndex(next);
    setShowSolution(false);
    setEntries([]);
    setVisible([]);
    setStatus(`➡️ Runde ${loesungen[next].id}: ${loesungen[next].name}`);
  };

  return (
    <div className="p-4 space-y-4 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-center">🗺️ GeoQuiz Admin</h1>

      {/* Steuerung */}
      <div className="flex flex-wrap justify-center items-center gap-2">
        <select
          className="border p-2 rounded"
          value={runde.id}
          onChange={(e) => {
            const selected = loesungen.find((r) => r.id === Number(e.target.value));
            setRunde(selected);
            setRundeIndex(loesungen.indexOf(selected));
          }}
        >
          {loesungen.map((r) => (
            <option key={r.id} value={r.id}>
              Runde {r.id}: {r.name}
            </option>
          ))}
        </select>

        <button
          onClick={startRound}
          className="px-4 py-2 rounded border font-semibold bg-green-600 text-white"
        >
          ▶️ Start
        </button>

        <button
          onClick={stopRound}
          className="px-4 py-2 rounded border font-semibold bg-red-600 text-white"
        >
          ⏹ Stopp
        </button>

        <button
          onClick={nextRound}
          className="px-4 py-2 rounded border font-semibold bg-yellow-500 text-white"
        >
          ⏭️ Nächste Runde
        </button>

        <button
          onClick={loadData}
          className="px-4 py-2 rounded border font-semibold bg-gray-600 text-white"
        >
          🔁 Aktualisieren
        </button>

        <button
          onClick={startReplay}
          disabled={isReplaying}
          className="px-4 py-2 rounded border font-semibold bg-blue-600 text-white disabled:opacity-50"
        >
          🎬 Replay
        </button>
      </div>

      {status && <p className="text-center text-gray-700 font-medium">{status}</p>}

      {/* Karte */}
      <div className="h-[500px] w-full border rounded overflow-hidden">
        <AdminMap
          shownEntries={isReplaying ? visible : entries}
          showSolution={showSolution}
          solution={runde}
        />
      </div>

      {/* Ergebnistabelle */}
      {showSolution && entries.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Abweichung (km)</th>
                <th className="border p-2">Latitude</th>
                <th className="border p-2">Longitude</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id} className="text-center">
                  <td className="border p-2">{e.name}</td>
                  <td className="border p-2">
                    {distanceKm(e.latitude, e.longitude, runde.lat, runde.lng).toFixed(1)}
                  </td>
                  <td className="border p-2">{e.latitude.toFixed(4)}</td>
                  <td className="border p-2">{e.longitude.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
