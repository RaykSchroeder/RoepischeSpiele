import { useRef, useState, useEffect } from "react";
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

  // Canvas auf Gerätegröße anpassen
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "black";

    // Automatisch an Bildschirmbreite anpassen (max 600px)
    const maxWidth = Math.min(window.innerWidth - 40, 600);
    canvas.width = maxWidth;
    canvas.height = Math.round(maxWidth * 1.2); // etwas höher
  }, []);

  const getPosition = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
  };

  const startDrawing = (e) => {
    const { x, y } = getPosition(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
    setDrawing(true);
  };

  const draw = (e) => {
    if (!drawing) return;
    const { x, y } = getPosition(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => setDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  async function handleSave() {
    if (!player.trim()) return alert("Bitte gib deinen Namen ein 🙏");

    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    const blob = await (await fetch(dataUrl)).blob();
    const filename = `${player.replace(/\s+/g, "_")}_${Date.now()}.png`;

    setStatus("⏳ Hochladen …");

    const { error: uploadError } = await supabase.storage
      .from("Roepischespiele")
      .upload(filename, blob, { contentType: "image/png", upsert: false });

    if (uploadError) {
      console.error(uploadError);
      setStatus("❌ Fehler beim Hochladen");
      return;
    }

    const { error: dbError } = await supabase
      .from("answers")
      .insert([{ player_name: player, image_path: filename }]);

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
        placeholder="Dein Name"
        value={player}
        onChange={(e) => setPlayer(e.target.value)}
        className="border p-2 rounded-lg mb-4 w-64 text-center"
      />

      <canvas
        ref={canvasRef}
        className="border border-gray-400 bg-white rounded-lg shadow-md touch-none"
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
