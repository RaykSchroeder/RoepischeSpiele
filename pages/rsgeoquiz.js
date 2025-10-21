import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { createClient } from "@supabase/supabase-js";

// ✅ Leaflet-Map nur im Browser
const DynamicMap = dynamic(() => import("../components/GeoQuizMap"), {
  ssr: false,
});

// ✅ Supabase-Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function RSGeoQuiz() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState(null);
  const [status, setStatus] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [nameFixed, setNameFixed] = useState(false); // 👤 Name nach Speichern fixieren

  // 🔄 Spielstatus abrufen beim Start
  useEffect(() => {
    checkGameState();
  }, []);

  const checkGameState = async () => {
    const { data, error } = await supabase
      .from("geoquiz_state")
      .select("is_active")
      .eq("id", 1)
      .single();
    if (!error && data) setIsActive(data.is_active);
  };

  // 💾 Speichern / Aktualisieren
  const handleSubmit = async () => {
    if (!name) return setStatus("❗ Bitte gib deinen Namen ein!");
    if (!position)
      return setStatus("❗ Bitte markiere zuerst einen Punkt auf der Karte!");

    // 🔒 Runde prüfen
    const { data: state, error: stateErr } = await supabase
      .from("geoquiz_state")
      .select("is_active")
      .eq("id", 1)
      .single();

    if (stateErr || !state) {
      setStatus("⚠️ Fehler beim Abrufen des Spielstatus!");
      return;
    }

    if (!state.is_active) {
      setStatus("⛔ Runde wurde vom Admin gestoppt!");
      return;
    }

    // ✅ Upsert (Name eindeutig)
    const { error } = await supabase.from("geoquiz_answers").upsert(
      [
        {
          name,
          latitude: position.lat,
          longitude: position.lng,
        },
      ],
      { onConflict: "name" }
    );

    if (error) {
      console.error(error);
      setStatus("❌ Fehler beim Speichern.");
    } else {
      setStatus("✅ Position gespeichert!");
      setNameFixed(true); // 👤 Name jetzt fixieren
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
        disabled={nameFixed} // 👤 nach erstem Speichern fix
        className="border p-2 w-full rounded disabled:bg-gray-100 disabled:text-gray-500"
      />

      <div className="h-[400px] w-full border rounded overflow-hidden">
        <DynamicMap position={position} setPosition={setPosition} />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isActive}
        className={`w-full font-semibold text-white px-4 py-2 rounded ${
          isActive
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        📍 Position speichern
      </button>

      {status && (
        <p className="text-center text-gray-700 font-medium">{status}</p>
      )}
    </div>
  );
}
