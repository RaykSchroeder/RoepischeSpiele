//RoepischeSpiele/pages/index.js
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    how_found: "",
    contact_person: "",
    consent: false,
  });
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // Prüfen, ob Checkbox gesetzt ist
    if (!form.consent) {
      alert(
        "Bitte bestätige, dass du die AGBs und Datenschutzbestimmungen akzeptierst."
      );
      return;
    }

    setStatus("sending");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("success");
      setForm({
        name: "",
        address: "",
        phone: "",
        email: "",
        how_found: "",
        contact_person: "",
        consent: false,
      });
    } else {
      setStatus("error");
    }
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-4 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <img
              src="/pictures/roepischespiele.png"
              alt="Röpische Spiele Logo"
              className="w-12 h-12 rounded-md shadow-md bg-white/20"
            />
            <h1 className="text-xl md:text-2xl font-bold">
              🏆 Röpische Spiele 2025
            </h1>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <a href="/datenschutz" className="hover:underline">
              Datenschutz
            </a>
            <a href="/agb" className="hover:underline">
              AGBs
            </a>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-3">
            Melde dich jetzt an! 🚀
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Wissen 💡 • Kreativität 🎨 • Geschick 🎯 • Schnelligkeit ⚡
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="👤 Dein Vor-/Nachname"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                required
              />
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="🏠 Deine Adresse"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="📞 Telefonnummer"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="📧 E-Mail-Adresse"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                required
              />
            </div>

            <div>
              <label className="font-medium text-gray-700">
                🌟 Wie bist du auf die Röpischen Spiele aufmerksam geworden?
              </label>
              <select
                name="how_found"
                value={form.how_found}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              >
                <option value="">Bitte auswählen</option>
                <option value="Facebook 👍">Facebook 👍</option>
                <option value="Instagram 📸">Instagram 📸</option>
                <option value="Erzählung / Freunde 🗣️">
                  Erzählung / Freunde 🗣️
                </option>
                <option value="Flyer / Plakat 🪧">Flyer / Plakat 🪧</option>
                <option value="Sonstiges ✨">Sonstiges ✨</option>
              </select>
            </div>

            <input
              name="contact_person"
              value={form.contact_person}
              onChange={handleChange}
              placeholder="👥 Verbindung zum Orga-Team (falls vorhanden)"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none w-full"
            />

            {/* Checkbox-Bereich */}
            <div className="flex items-start gap-2 bg-orange-50 border border-orange-200 p-3 rounded-lg">
              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={handleChange}
                className="mt-1 w-5 h-5 accent-orange-500 cursor-pointer"
              />
              <label className="text-gray-700 text-sm leading-snug">
                Ich erkläre mich mit den{" "}
                <a
                  href="/agb"
                  target="_blank"
                  className="text-orange-600 font-semibold hover:underline"
                >
                  AGBs
                </a>{" "}
                und der{" "}
                <a
                  href="/datenschutz"
                  target="_blank"
                  className="text-orange-600 font-semibold hover:underline"
                >
                  Datenschutzerklärung
                </a>{" "}
                der Röpischen Spiele einverstanden.
              </label>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg w-full transition transform hover:scale-105"
            >
              Jetzt anmelden 🔥
            </button>

            {status === "success" && (
              <p className="text-green-600 font-semibold text-center mt-2">
                ✅ Anmeldung erfolgreich! Wir sehen uns bei den Röpischen Spielen!
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 font-semibold text-center mt-2">
                ❌ Fehler beim Absenden. Bitte versuche es erneut.
              </p>
            )}
          </form>
        </div>
      </main>

      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        © 2025 Röpische Spiele •{" "}
        <a href="/datenschutz" className="underline hover:text-orange-600">
          Datenschutz
        </a>{" "}
        •{" "}
        <a href="/agb" className="underline hover:text-orange-600">
          AGBs
        </a>
      </footer>
    </div>
  );
}
