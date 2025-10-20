import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    how_found: "",
    contact_person: "",
  });

  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
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
      });
    } else {
      setStatus("error");
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-yellow-50 flex flex-col items-center justify-center px-4">
      {/* Header */}
      <header className="text-center mb-10">
        <img
          src="/picture/logo.png"
          alt="Röpische Spiele Logo"
          className="w-24 h-24 mx-auto mb-4 drop-shadow-lg"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-700">
          🏆 Röpische Spiele 2025
        </h1>
        <p className="text-lg mt-3 text-gray-700">
          Wissen 💡 • Kreativität 🎨 • Geschick 🎯 • Schnelligkeit ⚡
        </p>
      </header>

      {/* Formular */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 w-full max-w-2xl flex flex-col gap-4 border border-yellow-200"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="👤 Dein Name"
          className="p-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition"
        />
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="🏠 Deine Adresse"
          className="p-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="📞 Telefonnummer"
          className="p-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="📧 E-Mail-Adresse"
          className="p-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition"
        />

        <label className="font-medium text-gray-700 mt-2">
          🌟 Wie bist du auf die Röpischen Spiele aufmerksam geworden?
        </label>
        <select
          name="how_found"
          value={form.how_found}
          onChange={handleChange}
          className="p-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition"
        >
          <option value="">Bitte auswählen</option>
          <option value="Facebook 👍">Facebook 👍</option>
          <option value="Instagram 📸">Instagram 📸</option>
          <option value="Erzählung / Freunde 🗣️">Erzählung / Freunde 🗣️</option>
          <option value="Flyer / Plakat 🪧">Flyer / Plakat 🪧</option>
          <option value="Sonstiges ✨">Sonstiges ✨</option>
        </select>

        <input
          name="contact_person"
          value={form.contact_person}
          onChange={handleChange}
          placeholder="👥 Über wen hast du eine Verbindung zum Orga-Team?"
          className="p-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition"
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105 mt-3"
        >
          🚀 Jetzt anmelden
        </button>

        {status === "success" && (
          <p className="text-green-600 font-semibold text-center mt-2">
            ✅ Anmeldung erfolgreich! Danke fürs Mitmachen!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 font-semibold text-center mt-2">
            ❌ Fehler beim Absenden. Bitte versuche es später erneut.
          </p>
        )}
      </form>

      {/* Footer */}
      <footer className="text-gray-500 text-sm mt-10">
        <a href="/datenschutz" className="underline hover:text-yellow-700">
          Datenschutz
        </a>{" "}
        •{" "}
        <a href="/agb" className="underline hover:text-yellow-700">
          AGBs
        </a>{" "}
        • © 2025 Röpische Spiele
      </footer>
    </div>
  );
}
