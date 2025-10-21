import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { createClient } from "@supabase/supabase-js";

// ✅ Leaflet dynamisch importieren (kein SSR)
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false }
);

// ✅ Supabase initialisieren
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function RSGeoQuizAdmin() {
  const [entries, setEntries] = useState([]);
  const [displayCount, setDisplayCount] = useState("alle");
  const [status, setStatus] = useState("⏳ Lade Einträge...");

  // ✅ Daten laden
  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase
        .from("geoquiz_answers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setStatus("❌ Fehler beim Laden der Daten.");
      } else if (data.length === 0) {
        setStatus("ℹ️ Noch keine Einträge vorhanden.");
      } else {
        setEntries(data);
        setStatus("");
      }
    }

    loadData();
  }, []);

  // ✅ Anzahl der angezeigten Punkte
  const visibleEntries =
    displayCount === "alle"
      ? entries
      : entries.slice(0, parseInt(displayCount));

  return (
    <div className="p-4 space-y-4 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-center">🗺️ GeoQuiz Admin</h1>

      {/* Auswahl Anzahl */}
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
      </div>

      {/* Status */}
      {status && (
        <p className="text-center text-gray-700 font-medium">{status}</p>
      )}

      {/* Karte */}
      <div className="h-[500px] w-full border rounded overflow-hidden">
        <MapContainer
          center={[51.1657, 10.4515]} // Deutschland-Mitte
          zoom={6}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {visibleEntries.map((entry) => (
            <Marker
              key={entry.id}
              position={[entry.latitude, entry.longitude]}
            >
              <Popup>
                <strong>{entry.name}</strong>
                <br />
                {new Date(entry.created_at).toLocaleString("de-DE")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <p className="text-center text-sm text-gray-500">
        Angezeigt: {visibleEntries.length} / {entries.length} Einträge
      </p>
    </div>
  );
}
