import { useRef, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// 🔧 Supabase-Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SpielZeichnen() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [status, setStatus] = useState("");
  const [player, setPlayer] = useState("");

  // === Canvas dynamisch an Bildschirm anpassen ===
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "black";

    const maxWidth = Math.min(window.innerWidth - 40, 600);
    canvas.width = maxWidth;
    canvas.height = Math.round(maxWidth * 1.2);
  }, []);

  // === Position bestimmen ===
  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  // === Zeichen-Events ===
  const startDraw = (e) => {
    const { x, y } = getPos(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
    setDrawing(true);
  };

  const draw = (e) => {
    if (!drawing) return;
    const { x, y } = getPos(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => setDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  };

  // === Speichern + Upload mit weißem Hintergrund ===
  async function handleSave() {
    if (!player.trim()) return alert("Bitte gib deinen Namen ein 🙏");
    const canvas = canvasRef.current;

    // neues Canvas mit weißem Hintergrund erzeugen
    const tmp = document.createElement("canvas");
    tmp.width = canvas.width;
    tmp.height = canvas.height;
    const ctx = tmp.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, tmp.width, tmp.height);
    ctx.drawImage(canvas, 0, 0);

    // Blob erzeugen
    const dataUrl = tmp.toDataURL("image/png");
    const blob = await (await fetch(dataUrl)).blob();

    const filename = `${player.replace(/\s+/g, "_")}_${Date.now()}.png`;
    const path = `answers/${filename}`;

    setStatus("⏳ Hochladen …");

    // Upload in privaten Bucket
    const { error: uploadError } = await supabase.storage
      .from("Roepischespiele")
      .upload(path, blob, { contentType: "image/png", upsert: true });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      setStatus("❌ Fehler beim Hochladen");
      return;
    }

    // Eintrag in
