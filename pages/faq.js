import Layout from "../components/Layout";

export default function FAQ() {
  return (
    <Layout>
      <div className="max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">❓ FAQ</h2>
        <p className="text-gray-600">
          Hier beantworten wir die häufigsten Fragen rund um Anmeldung, Ablauf
          und Teilnahme.
        </p>
      </div>
    </Layout>
  );
}
