import Layout from "../components/Layout";

export default function Anfahrt() {
  return (
    <Layout>
      <div className="max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">🚗 Anfahrt</h2>
        <p className="text-gray-600">
          Hier findest du Informationen zur Anreise, Parkmöglichkeiten und dem
          Veranstaltungsort.
        </p>
      </div>
    </Layout>
  );
}
