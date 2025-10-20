export default function AGB() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-orange-600 mb-4 text-center">
          📜 Allgemeine Geschäftsbedingungen (AGB)
        </h1>

        <p className="text-gray-700 leading-relaxed mb-4">
          Mit der Anmeldung zu den <strong>Röpischen Spielen</strong> erklärst du dich mit den folgenden Bedingungen einverstanden:
        </p>

        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Die Teilnahme erfolgt auf eigene Verantwortung.</li>
          <li>Das Orga-Team behält sich das Recht vor, Änderungen am Ablauf oder an den Regeln vorzunehmen.</li>
          <li>Bei mutwilligen Beschädigungen oder unsportlichem Verhalten kann ein Ausschluss erfolgen.</li>
          <li>Foto- und Videoaufnahmen dürfen für die Berichterstattung und Social-Media genutzt werden.</li>
          <li>Datenschutzbestimmungen siehe separate Datenschutzerklärung.</li>
        </ul>

        <p className="text-gray-700 leading-relaxed">
          Für Fragen oder Rücktritt von der Anmeldung wende dich bitte an das Orga-Team:
          <br />
          <strong>info@roepischespiele.de</strong>
        </p>
      </div>
    </div>
  );
}
