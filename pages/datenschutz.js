export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-orange-600 mb-4 text-center">
          🔒 Datenschutzerklärung
        </h1>

        <p className="text-gray-700 leading-relaxed mb-4">
          Wir nehmen den Schutz deiner persönlichen Daten sehr ernst. Deine Daten werden ausschließlich
          im Rahmen der Anmeldung zu den <strong>Röpischen Spielen</strong> verarbeitet und nicht an Dritte weitergegeben.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Erhobene Daten: Name, Adresse, Telefonnummer, E-Mail-Adresse sowie freiwillige Angaben wie
          Herkunft der Information über das Event und Kontaktperson.  
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Zweck der Datenverarbeitung: Organisation, Planung und Kommunikation rund um die Röpischen Spiele.
          Die Daten werden nach Abschluss des Events gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Mit Absenden des Formulars willigst du in die Verarbeitung deiner Daten gemäß dieser Erklärung ein.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Verantwortlich:  
          <br />
          <strong>Orga-Team Röpische Spiele</strong>  
          <br />
          Kontakt: info@roepischespiele.de
        </p>
      </div>
    </div>
  );
}
