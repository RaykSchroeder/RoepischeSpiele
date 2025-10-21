import { useState } from "react";
import dynamic from "next/dynamic";
import { createClient } from "@supabase/supabase-js";

// ✅ Leaflet-Komponenten nur im Browser laden (kein SSR)
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
const useMapEvents = dynamic(
  () => import("react-leaflet").then((m) => m.useMapEvents),
  { ssr: false }
);

// ✅ Supabase Client initialisieren
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// ✅ Karte mit Klick-Event
function ClickableMap({ onSelect }) {
  const MapClick = () => {
    useMapEvents({
      click(e) {
        onSelect(e.latlng);
      },
    });
    return null;
  };
  return <MapClick />;
}

export default function RSGeoQuiz() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    if (!name) {
      setStatus("❗ Bitte gib deinen Namen ein!");
      return;
    }
    if (!position) {
      setStatus("❗ Bitte markiere zuerst einen Punkt auf der Karte!");
      return;
    }

    const { error } = await supabase.from("geoquiz_answers").insert([
      {
        name,
        latitude: position.lat,
        longitude: position.lng,
      },
    ]);

    if (error) {
      console.error(error);
      setStatus("❌ Fehler beim Speichern.");
    } else {
      setStatus("✅ Position erfolgreich gespeichert!");
      setName("");
      setPosition(null);
    }
  };

  return (
    <div className="p-4 space-y-4 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-center">🌍 RS GeoQuiz</h1>

      <input
        type="text"
        placeholder="Dein Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full rounded"
      />

      <div className="h-[400px] w-full border rounded overflow-hidden">
        <MapContainer
          center={[51.1657, 10.4515]} // Deutschland Mitte
          zoom={6}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickableMap onSelect={setPosition} />
          {position && <Marker position={position}></Marker>}
        </MapContainer>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full font-semibold"
      >
        📍 Position bestätigen
      </button>

      {status && (
        <p className="text-center text-gray-700 font-medium">{status}</p>
      )}
    </div>
  );
}
