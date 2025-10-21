import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminAntworten() {
  const [antworten, setAntworten] = useState([]);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState("");
  const [showSolution, setShowSolution] = useState(false);

  // === Daten laden ===
  useEffect(() => {
    async function loadData() {
      setStatus("Lade Antworten …");
      const { data, error } = await supabase
        .from("answers")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error(error);
        setStatus("Fehler beim Laden 😕");
        return;
      }

      // Signierte URLs für alle Bilder holen
      const withUrls = await Promise.all(
        data.map(async (row) => {
          const { data: signedUrlData, error: urlError } =
            await supabase.storage
              .from("Roepischespiele")
              .createSignedUrl(row.image_path, 60 * 5); // 5 Minuten gültig

          if (urlError) console.error(urlError);
          return { ...row, signedUrl: signedUrlData?.signedUrl || null };
        })
      );

      setAntworten(withUrls);
      setStatus("");
    }

    loadData();
  }, []);

  // === Alles löschen ===
  async function deleteAll() {
    if (!confirm("Wirklich ALLES löschen? Das kann nicht rückgängig gemacht werden!"))
      return;

    setStatus("Lösche Datenbank …");

    const { error } = await supabase.from("answers").delete().neq("id", 0);
    if (error) {
      console.error(error);
      setStatus("❌ Fehler beim Löschen");
    } else {
      setAntworten([]);
      setStatus("✅ Alles gelöscht!");
    }
  }

  // === Navigation ===
  const next = () => setIndex((i) => Math.min(i + 1, antworten.length - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  if (status) return <p className="text-center mt-10">{status}</p>;

  if (antworten.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Admin-Ansicht</h1>
        <p>Keine Antworten vorhanden.</p>
        <button
          onClick={deleteAll}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Alles löschen
        </button>
      </div>
    );

  const aktuelle = antworten[index];
  const naechste = antworten[index + 1];

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <div className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-xl font-bold">🧠 Admin – Antworten</h1>
        <div className="flex gap-2">
          <button
            onClick={prev}
            disabled={index === 0}
            className="bg-gray-300 px-3 py-1 rounded-lg disabled:opacity-40"
          >
            ⬅️ Zurück
          </button>
          <button
            onClick={next}
            disabled={index === antworten.length - 1}
            className="bg-gray-300 px-3 py-1 rounded-lg disabled:opacity-40"
          >
            Weiter ➡️
          </button>
          <button
            onClick={deleteAll}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
          >
            Alles löschen
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Linke Seite: aktuelle Antwort */}
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h2 className="font-semibold mb-2">
            Spieler: {aktuelle.player_name || "Unbekannt"}
          </h2>
          {aktuelle.signedUrl ? (
            <img
              src={aktuelle.signedUrl}
              alt="Antwort"
              className="max-w-full max-h-[70vh] rounded-lg shadow-md border border-gray-300"
            />
          ) : (
            <p className="text-gray-500">Kein Bild verfügbar</p>
          )}
        </div>

        {/* Rechte Seite: nächste Vorschau */}
        <div className="flex-1 flex flex-col items-center justify-center bg-slate-200 p-4">
          {naechste ? (
            <>
              <h3 className="font-semibold mb-2 text-gray-700">
                Nächster Spieler: {naechste.player_name}
              </h3>
              {naechste.signedUrl ? (
                <img
                  src={naechste.signedUrl}
                  alt="Nächste Antwort"
                  className="max-w-full max-h-[50vh] opacity-70 rounded-md"
                />
              ) : (
                <p className="text-gray-500">Kein Bild</p>
              )}
            </>
          ) : (
            <>
              {!showSolution ? (
                <button
                  onClick={() => setShowSolution(true)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  🧩 Lösung anzeigen
                </button>
              ) : (
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">✅ Lösung</h3>
                  <p className="text-gray-700">
                    (Hier kannst du später deine echte Lösung einblenden.)
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
