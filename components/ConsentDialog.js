import { useState } from "react";
import Link from "next/link";

export default function ConsentDialog({ onConfirm }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Jetzt anmelden
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md text-center shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Datenschutzhinweis
            </h2>
            <p className="mb-4 text-sm text-gray-700">
              Mit dem Absenden willige ich ein, dass meine Angaben im Rahmen der
              „Röpischen Spiele“ gespeichert und zur Organisation der Veranstaltung
              verwendet werden. Weitere Informationen findest du in unseren{" "}
              <Link href="/privacy" className="text-blue-600 underline">Datenschutzrichtlinien</Link>{" "}
              und <Link href="/terms" className="text-blue-600 underline">AGB</Link>.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setOpen(false)}
                className="border px-4 py-2 rounded"
              >
                Abbrechen
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  onConfirm();
                }}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Einverstanden & Senden
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

