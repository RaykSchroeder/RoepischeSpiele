import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { createClient } from "@supabase/supabase-js";

// ✅ Leaflet-Komponenten nur clientseitig laden
const AdminMap = dynamic(() => import("../components/GeoQuizAdminMap"), {
  ssr: false,
});

// ✅ Supabase initialisieren
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function RSGeoQuizAdmin() {
  const [entries, setEntries] = useState([]);
  const [displayCount, setDisplayCount] = useState("alle");
  const [status, setStatus] = useState("⏳ Lade Einträge...");

  // 🔄 Daten abrufen
  const loadData = async () => {
    const { data, error } = await supabase
      .from("geoquiz_answers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setStatus("❌ Fehler beim Laden der Daten.");
    } else if (!data || data.length === 0) {
      setStatus("ℹ️ Noch keine Einträge vorhanden.");
      setEntries([]);
    } else {
      setEntries(data);
      setStatus("");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const visibleEntries =
    displayCount === "alle"
      ? entries
      : entries.slice(0, parseInt(displayCount));

  return (
    <div className="p-4 space-y-4 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-center">🗺️ GeoQuiz Admin</h1>

      {/* Auswahlfeld */}
      <div className="flex justify-center gap-2 flex-wrap">
        {["2", "4", "6", "8", "alle"].map((num) => (
          <button
            key={num}
            onClick={() => setDisplayCount(num)}
            className={`px-4 py-2 rounded border font-semibold ${
              displayCount === num
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            {num === "alle" ? "Alle" : `${num} anzeigen`}
          </button>
        ))}

        {/* 🔁 Reload-Button */}
        <button
          onClick={loadData}
          className="px-4 py-2 rounded border font-semibold bg-green-600 text-white"
        >
          🔁 Aktualisieren
        </button>
      </div>

      {status && (
        <p className="text-center text-gray-700 font-medium">{status}</p>
      )}

      {/* Karte */}
      <div className="h-[500px] w-full border rounded overflow-hidden">
        <AdminMap entries={visibleEntries} />
      </div>

      <p className="text-center text-sm text-gray-500">
        Angezeigt: {visibleEntries.length} / {entries.length} Einträge
      </p>
    </div>
  );
}
