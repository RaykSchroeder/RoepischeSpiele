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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 to-yellow-500 text-white text-center">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">🎉 Danke für deine Anmeldung!</h1>
          <p>Wir freuen uns auf dich bei den Röpischen Spielen!</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center relative">
      {/* Logo-Bereich */}
      <div className="absolute top-6 flex flex-col items-center w-full">
        {/* Platzhalter für dein Logo */}
        <Image
          src="/picture/logo.png"
          alt="Röpische Spiele Logo"
          width={120}
          height={120}
          className="rounded-full shadow-lg border border-white/30"
        />
        <h1 className="text-3xl font-bold text-white mt-4 drop-shadow-md">
          Röpische Spiele 2025
        </h1>
        <p className="text-white/80 text-sm">
          Wissen • Kreativität • Geschick • Schnelligkeit
        </p>
      </div>

      {/* Formular-Karte */}
      <form
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md mt-48 space-y-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
          Melde dich jetzt an!
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Adresse"
          className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <input
          type="text"
          placeholder="Telefon"
          className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          type="email"
          placeholder="E-Mail"
          className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Wie aufmerksam geworden */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Wie bist du auf die Röpischen Spiele aufmerksam geworden?
          </label>
          <select
            className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={form.how_found}
            onChange={(e) => setForm({ ...form, how_found: e.target.value })}
          >
            <option value="">Bitte auswählen</option>
            <option>Instagram</option>
            <option>Facebook</option>
            <option>Erzählung / Freunde</option>
            <option>Plakat / Flyer</option>
            <option>Ortsverein / Feuerwehr</option>
            <option>Sonstiges</option>
          </select>

          {form.how_found === "Sonstiges" && (
            <input
              type="text"
              placeholder="Bitte angeben..."
              className="border w-full p-3 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={form.how_found_other}
              onChange={(e) =>
                setForm({ ...form, how_found_other: e.target.value })
              }
            />
          )}
        </div>

        <input
          type="text"
          placeholder="Über wen hast du eine Verbindung zum Orga-Team?"
          className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.contact_person}
          onChange={(e) =>
            setForm({ ...form, contact_person: e.target.value })
          }
        />

        <ConsentDialog onConfirm={handleSubmit} />

        {loading && (
          <p className="text-sm text-gray-500 text-center animate-pulse">
            Daten werden gesendet …
          </p>
        )}
      </form>
    </div>
  );
}
