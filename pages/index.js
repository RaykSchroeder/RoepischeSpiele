import { useState } from "react";
import ConsentDialog from "../components/ConsentDialog";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) setSuccess(true);
  };

  if (success)
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">🎉 Danke für deine Anmeldung!</h1>
          <p>Wir freuen uns auf dich bei den Röpischen Spielen.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="text-2xl font-bold text-center">Röpische Spiele Anmeldung</h1>

        <input
          type="text"
          placeholder="Name"
          className="border w-full p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Adresse"
          className="border w-full p-2 rounded"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <input
          type="text"
          placeholder="Telefon"
          className="border w-full p-2 rounded"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          type="email"
          placeholder="E-Mail"
          className="border w-full p-2 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <ConsentDialog onConfirm={handleSubmit} />

        {loading && <p className="text-sm text-gray-500 text-center">Senden …</p>}
      </form>
    </div>
  );
}

