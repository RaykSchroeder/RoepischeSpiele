import { useState } from "react";
import dynamic from "next/dynamic";
import { createClient } from "@supabase/supabase-js";

// ✅ Leaflet-Module nur clientseitig laden
const DynamicMap = dynamic(() => import("../components/GeoQuizMap"), {
  ssr: false,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function RSGeoQuiz() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    if (!name) return setStatus("❗ Bitte gib deinen Namen ein!");
    if (!position)
      return setStatus("❗ Bitte markiere zuerst einen Punkt auf der Karte!");

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
