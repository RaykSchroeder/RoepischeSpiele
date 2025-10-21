import Layout from "../components/Layout";

export default function Galerie() {
  return (
    <Layout>
      <div className="max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">📸 Galerie</h2>
        <p className="text-gray-600">
          Hier kannst du bald Fotos und Eindrücke der vergangenen Röpischen Spiele sehen!
        </p>
      </div>
    </Layout>
  );
}
