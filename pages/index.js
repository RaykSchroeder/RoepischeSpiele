import { useState } from "react";
import ConsentDialog from "../components/ConsentDialog";
import Image from "next/image";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    how_found: "",
    contact_person: "",
    how_found_other: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    const how_found_final =
      form.how_found === "Sonstiges" ? form.how_found_other : form.how_found;

    setLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, how_found: how_found_final }),
    });
    setLoading(false);
    if (res.ok) setSuccess(true);
  };

  if (success)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 text-white text-center p-6">
        <h1 className="text-4xl font-extrabold mb-4 animate-bounce">🎉 Anmeldung erfolgreich!</h1>
        <p className="text-lg mb-8">
          Danke für deine Anmeldung bei den <strong>Röpischen Spielen</strong>!  
          Wir freuen uns auf dich! 💪🔥
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="bg-white text-orange-600 font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-orange-100 transition"
        >
          🔙 Zurück zur Anmeldung
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Leichter animierter Farbverlauf */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_60%)] animate-pulse" />

      <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-lg relative z-10 text-gray-800">
        {/* Logo + Titel */}
        <div className="text-center mb-6">
          <Image
            src="/picture/logo.png"
            alt="Röpische Spiele Logo"
            width={100}
            height={100}
            className="mx-auto rounded-full shadow-md border border-gray-200"
          />
          <h1 className="text-3xl font-extrabold mt-4 text-indigo-700">
            🏆 Röpische Spiele 2025
          </h1>
          <p className="text-gray-600 italic">
            Wissen 💡 • Kreativität 🎨 • Geschick 🎯 • Schnelligkeit ⚡
          </p>
        </div>

        {/* Formular */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <input
            type="text"
            placeholder="👤 Dein Name"
            className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="🏠 Deine Adresse"
            className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <input
            type="text"
            placeholder="📞 Telefonnummer"
            className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            type="email"
            placeholder="📧 E-Mail-Adresse"
            className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* Wie aufmerksam geworden */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              🌟 Wie bist du auf die Röpischen Spiele aufmerksam geworden?
            </label>
            <select
              className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={form.how_found}
              onChange={(e) => setForm({ ...form, how_found: e.target.value })}
            >
              <option value="">Bitte auswählen</option>
              <option>Instagram 📱</option>
              <option>Facebook 👍</option>
              <option>Erzählung / Freunde 🗣️</option>
              <option>Plakat / Flyer 📜</option>
              <option>Ortsverein / Feuerwehr 🚒</option>
              <option>Sonstiges ✏️</option>
            </select>

            {form.how_found === "Sonstiges ✏️" && (
              <input
                type="text"
                placeholder="Bitte angeben..."
                className="border w-full p-3 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                value={form.how_found_other}
                onChange={(e) =>
                  setForm({ ...form, how_found_other: e.target.value })
                }
              />
            )}
          </div>

          <input
            type="text"
            placeholder="🧑‍🤝‍🧑 Über wen hast du eine Verbindung zum Orga-Team?"
            className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={form.contact_person}
            onChange={(e) =>
              setForm({ ...form, contact_person: e.target.value })
            }
          />

          <ConsentDialog onConfirm={handleSubmit} />

          {loading && (
            <p className="text-sm text-center text-gray-600 animate-pulse">
              ⏳ Deine Anmeldung wird übermittelt …
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
