//RoepischeSpiele/components/ConsentDialog.js

export default function ConsentDialog({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md text-center">
        <h2 className="text-xl font-bold mb-4">Datenschutzhinweis 🛡️</h2>
        <p className="text-sm text-gray-700 mb-6">
          Mit dem Absenden willige ich ein, dass meine Angaben im Rahmen der
          „Röpischen Spiele“ gespeichert und zur Organisation der Veranstaltung
          verwendet werden. Weitere Informationen findest du in unseren{" "}
          <a href="/privacy" className="text-blue-600 underline">
            Datenschutzrichtlinien
          </a>{" "}
          und{" "}
          <a href="/terms" className="text-blue-600 underline">
            AGB
          </a>.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="border px-5 py-2 rounded-lg hover:bg-gray-100"
          >
            Abbrechen
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
          >
            ✅ Einverstanden & Senden
          </button>
        </div>
      </div>
    </div>
  );
}
