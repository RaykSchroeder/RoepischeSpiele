export default function AGB() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          📜 Allgemeine Geschäftsbedingungen (AGB)
        </h1>

        <p className="text-gray-700 leading-relaxed mb-6 text-center">
          Mit der Anmeldung zu den <strong>Röpischen Spielen</strong> erklärst du dich mit den folgenden Bedingungen einverstanden.
        </p>

        <div className="text-gray-700 leading-relaxed space-y-6">
          <section>
            <h2 className="font-semibold text-lg mb-2">1. Veranstalter</h2>
            <p>
              Veranstalter der <strong>„Röpischen Spiele“</strong> ist <strong>[Vorname Nachname]</strong>,{" "}
              <strong>[Straße und Hausnummer]</strong>, <strong>[PLZ Ort]</strong>, E-Mail:{" "}
              <strong>info@roepischespiele.de</strong> (nachfolgend „Veranstalter“ genannt).
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">2. Geltungsbereich</h2>
            <p>
              Diese AGB regeln a) die Teilnahmebedingungen für die Veranstaltung „Röpische Spiele“ sowie b) die Nutzung
              der Website <strong>www.roepischespiele.de</strong>. Mit der Anmeldung bzw. Nutzung der Website werden
              diese Bedingungen anerkannt.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">3. Veranstaltung und Teilnahmevoraussetzungen</h2>
            <ul className="list-disc list-inside">
              <li>Jährliche Freizeitveranstaltung für Freunde und geladene Gäste.</li>
              <li>Teilnahme ab 18 Jahren, max. 24 Personen.</li>
              <li>Jeder spielt individuell, keine Teams.</li>
              <li>Ort: <strong>[Ort, genaue Adresse]</strong>; Datum: <strong>[Datum]</strong>.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">4. Anmeldung und Vertragsschluss</h2>
            <p>
              Die Anmeldung erfolgt über das Online-Formular (alternativ per E-Mail oder Telefon) mit Angabe von Name,
              E-Mail und Telefonnummer. Die Daten werden in Supabase gespeichert. Der Vertrag kommt erst zustande, wenn
              der Veranstalter die Anmeldung manuell bestätigt und die Startgebühr von <strong>[XX,XX €]</strong>{" "}
              eingegangen ist. Bei Nichtbestätigung wird der Betrag vollständig zurückerstattet.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">5. Teilnahmegebühr</h2>
            <p>
              Die Teilnahme ist nur nach vollständiger Zahlung der Startgebühr möglich. Zahlungsdetails werden mit der
              Anmeldebestätigung übermittelt.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">6. Leistungen</h2>
            <p>
              Im Rahmen der Veranstaltung werden ein Buffet mit Speisen sowie Getränke (Softdrinks, Bier und
              Cider/Summersby) bereitgestellt. Änderungen im Ablauf oder Angebot, die den Gesamtcharakter nicht
              wesentlich beeinflussen, bleiben vorbehalten.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">7. Rücktritt, Absage und Nichtteilnahme</h2>
            <ul className="list-disc list-inside">
              <li>
                Stornierung nur in Ausnahmefällen bis 10 Tage vor Beginn möglich. Es kann eine Teilrückerstattung oder
                Gutschrift für das Folgejahr erfolgen.
              </li>
              <li>
                Bei Nichterscheinen oder späterem Rücktritt besteht kein Anspruch auf Rückzahlung.
              </li>
              <li>
                Wird die Veranstaltung aus Gründen wie Krankheit, Wetter oder behördlichen Auflagen abgesagt, erfolgt
                eine Teilrückerstattung oder Gutschrift.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">8. Haftung und Sicherheit</h2>
            <ul className="list-disc list-inside">
              <li>Die Teilnahme erfolgt auf eigene Gefahr.</li>
              <li>
                Der Veranstalter haftet nicht für Personen-, Sach- oder Vermögensschäden, außer bei Vorsatz oder grober
                Fahrlässigkeit.
              </li>
              <li>Es besteht keine Veranstalter- oder Haftpflichtversicherung.</li>
              <li>
                Teilnehmer, die sich unangemessen verhalten oder andere gefährden, können ausgeschlossen werden. Eine
                Rückerstattung erfolgt nicht.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">9. Foto- und Videoaufnahmen</h2>
            <p>
              Während der Veranstaltung werden Fotos und Videos erstellt. Mit der Teilnahme erklärst du dich
              einverstanden, dass diese Aufnahmen auf der Website und in sozialen Medien veröffentlicht werden dürfen.
              Ein Widerruf ist per E-Mail an <strong>info@roepischespiele.de</strong> möglich.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">10. Datenschutz</h2>
            <p>
              Die Verarbeitung personenbezogener Daten erfolgt gemäß der gesetzlichen Bestimmungen. Details findest du
              in der <strong>Datenschutzerklärung</strong> auf dieser Website.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">11. Nutzung der Website</h2>
            <ul className="list-disc list-inside">
              <li>Der Veranstalter bemüht sich um eine jederzeit erreichbare, fehlerfreie Website.</li>
              <li>Es besteht kein Anspruch auf ständige Verfügbarkeit oder technische Fehlerfreiheit.</li>
              <li>
                Alle Inhalte der Website unterliegen dem Urheberrecht und dürfen ohne Zustimmung nicht verwendet
                werden.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">12. Änderungen der AGB</h2>
            <p>
              Der Veranstalter kann diese AGB jederzeit ändern. Die jeweils aktuelle Fassung wird auf der Website
              veröffentlicht und gilt ab dem Zeitpunkt der Veröffentlichung.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">13. Anwendbares Recht und Gerichtsstand</h2>
            <p>
              Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist der Wohnsitz des Veranstalters.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">14. Salvatorische Klausel</h2>
            <p>
              Sollte eine Bestimmung dieser AGB unwirksam sein, bleibt die Gültigkeit der übrigen unberührt. Es gilt die
              Regelung, die dem wirtschaftlichen Zweck am nächsten kommt.
            </p>
          </section>

          <section className="pt-4 border-t border-gray-200">
            <p>
              <strong>Kontakt:</strong>
              <br />
              [Vorname Nachname]
              <br />
              [Straße und Hausnummer]
              <br />
              [PLZ Ort]
              <br />
              E-Mail: <strong>info@roepischespiele.de</strong>
              <br />
              Website: <strong>www.roepischespiele.de</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
