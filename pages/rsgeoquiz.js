import { useState } from "react";
import dynamic from "next/dynamic";
import { createClient } from "@supabase/supabase-js";

// ✅ Leaflet-Map wird nur im Browser geladen
const DynamicMap = dynamic(() => import("../components/GeoQuizMap"), {
  ssr: false,
});

// ✅ Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

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
        {/* Die Karte wird nur clientseitig geladen */}
        <DynamicMap position={position} setPosition={setPosition} />
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
