import { useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SpielZeichnen() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [status, setStatus] = useState("");
  const [player, setPlayer] = useState("");

  // === Zeichnen starten ===
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    const rect = canvas.getBoundingClientRect();
    const x = e.touches ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = e.touches ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.moveTo(x, y);
    setDrawing(true);
  };

  // === Zeichnen während Bewegung ===
  const draw = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.touches ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = e.touches ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  // === Zeichnen stoppen ===
  const stopDrawing = () => setDrawing(false);

  // === Canvas löschen ===
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // === Hochladen in Supabase Storage ===
  async function handleSave() {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");

    // Base64 → Blob konvertieren
    const blob = await (await fetch(dataUrl)).blob();
    const filename = `${Date.now()}_${Math.floor(Math.random() * 10000)}.png`;

    setStatus("⏳ Hochladen …");

    // In privaten Bucket hochladen
    const { error: uploadError } = await supabase.storage
      .from("dein_bucket_name") // ⚠️ anpassen!
      .upload(filename, blob, { contentType: "image/png" });

    if (uploadError) {
      console.error(uploadError);
      setStatus("❌ Fehler beim Hochladen");
      return;
    }

    // Pfad in Datenbank speichern
    const { error: dbError } = await supabase
      .from("answers")
      .insert([{ player_name: player || "Unbekannt", image_path: filename }]);

    if (dbError) {
      console.error(dbError);
      setStatus("❌ Fehler beim Speichern in DB");
    } else {
      setStatus("✅ Antwort gespeichert!");
      clearCanvas();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <h1 className="text-2xl font-bold mb-4">✍️ Deine Antwort zeichnen</h1>

      <input
        type="text"
        placeholder="Dein Name (optional)"
        value={player}
        onChange={(e) => setPlayer(e.target.value)}
        className="border p-2 rounded-lg mb-4 w-64"
      />

      <canvas
        ref={canvasRef}
        width={320}
        height={200}
        className="border border-gray-400 bg-white rounded-lg touch-none"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />

      <div className="flex gap-4 mt-4">
        <button
          onClick={clearCanvas}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
        >
          Löschen
        </button>
        <button
          onClick={handleSave}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
        >
          Speichern
        </button>
      </div>

      {status && <p className="mt-3 text-sm text-gray-600">{status}</p>}
    </div>
  );
}
