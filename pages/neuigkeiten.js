import Layout from "../components/Layout";

export default function Neuigkeiten() {
  return (
    <Layout>
      <div className="max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">🗞️ Neuigkeiten</h2>
        <p className="text-gray-600">
          Hier findest du aktuelle Informationen, Updates und Neuigkeiten rund
          um die Röpischen Spiele 2026!
        </p>
      </div>
    </Layout>
  );
}
