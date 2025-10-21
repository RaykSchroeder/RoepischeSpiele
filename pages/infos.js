import Layout from "../components/Layout";

export default function Infos() {
  return (
    <Layout>
      <div className="max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">ℹ️ Infos zum Event</h2>
        <p className="text-gray-600">
          Hier findest du alle wichtigen Details zum Ablauf, zu den Teams und
          zu den Spielregeln der Röpischen Spiele.
        </p>
      </div>
    </Layout>
  );
}
