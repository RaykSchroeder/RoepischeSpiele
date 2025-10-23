export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          🔒 Datenschutzerklärung
        </h1>

        <p className="text-gray-700 leading-relaxed mb-6 text-center">
          Der Schutz deiner persönlichen Daten ist uns wichtig. Nachfolgend informieren wir dich über die Verarbeitung
          personenbezogener Daten im Zusammenhang mit der Website{" "}
          <strong>www.roepischespiele.de</strong> und der Veranstaltung{" "}
          <strong>„Röpische Spiele“</strong>.
        </p>

        <div className="text-gray-700 leading-relaxed space-y-6">
          <section>
            <h2 className="font-semibold text-lg mb-2">1. Verantwortliche Stelle</h2>
            <p>
              Verantwortlich im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
              <br />
              <strong>[Vorname Nachname]</strong>
              <br />
              [Straße und Hausnummer]
              <br />
              [PLZ Ort]
              <br />
              E-Mail: <strong>info@roepischespiele.de</strong>
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">2. Zweck und Rechtsgrundlage der Datenverarbeitung</h2>
            <p>
              Wir verarbeiten personenbezogene Daten ausschließlich zur Organisation, Durchführung und Nachbereitung der
              „Röpischen Spiele“ sowie zur Kommunikation mit Teilnehmern. Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. b DSGVO
              (Vertragserfüllung) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer reibungslosen
              Durchführung der Veranstaltung).
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">3. Erhobene Daten</h2>
            <ul className="list-disc list-inside">
              <li>Name</li>
              <li>E-Mail-Adresse</li>
              <li>Telefonnummer</li>
              <li>ggf. Zahlungsinformationen (Startgebühr)</li>
            </ul>
            <p className="mt-2">
              Diese Daten werden im Rahmen der Anmeldung erfasst und für organisatorische Zwecke gespeichert.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">4. Speicherung und Hosting</h2>
            <p>
              Die Website <strong>www.roepischespiele.de</strong> wird über den Anbieter{" "}
              <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723, USA, gehostet.  
              Der Quellcode wird auf <strong>GitHub</strong> gespeichert (GitHub Inc., USA).  
              Daten, die über das Onlineformular übermittelt werden, werden in{" "}
              <strong>Supabase</strong> (Supabase Inc., 970 Toa Payoh North, Singapore) verarbeitet und gespeichert.  
              Der E-Mail-Verkehr erfolgt über <strong>Gmail</strong> (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland).
            </p>
            <p className="mt-2">
              Mit allen genannten Dienstleistern bestehen Verträge bzw. Standardvertragsklauseln zur Einhaltung der
              Datenschutzvorgaben gemäß Art. 46 DSGVO. Die Übermittlung in Drittländer erfolgt nur, wenn ein angemessenes
              Datenschutzniveau gewährleistet ist.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">5. Dauer der Speicherung</h2>
            <p>
              Personenbezogene Daten werden nur so lange gespeichert, wie dies zur Durchführung der Veranstaltung
              erforderlich ist. Nach Abschluss der Veranstaltung werden sie spätestens nach 12 Monaten gelöscht, sofern
              keine gesetzlichen Aufbewahrungsfristen bestehen.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">6. Foto- und Videoaufnahmen</h2>
            <p>
              Während der Veranstaltung werden Fotos und Videos erstellt. Diese dienen der Erinnerung und Öffentlichkeitsarbeit
              (z. B. auf der Website oder in sozialen Medien). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse).  
              Du kannst der Veröffentlichung deiner Abbildung jederzeit per E-Mail an{" "}
              <strong>info@roepischespiele.de</strong> widersprechen. Bereits veröffentlichte Inhalte werden im Rahmen
              des Zumutbaren entfernt.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">7. Weitergabe von Daten</h2>
            <p>
              Eine Weitergabe personenbezogener Daten an Dritte erfolgt ausschließlich, soweit dies für die Durchführung
              der Veranstaltung erforderlich ist (z. B. Zahlungsabwicklung) oder eine gesetzliche Verpflichtung besteht.
              Eine kommerzielle Weitergabe oder Nutzung zu Werbezwecken findet nicht statt.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">8. Deine Rechte</h2>
            <ul className="list-disc list-inside">
              <li>Auskunft über gespeicherte Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung („Recht auf Vergessenwerden“, Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen Verarbeitung (Art. 21 DSGVO)</li>
            </ul>
            <p className="mt-2">
              Zur Wahrnehmung dieser Rechte sende eine E-Mail an <strong>info@roepischespiele.de</strong>.
              Dir steht außerdem ein Beschwerderecht bei der zuständigen Datenschutzaufsichtsbehörde zu.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">9. Sicherheit</h2>
            <p>
              Alle Systeme (Vercel, Supabase, Gmail, GitHub) verwenden verschlüsselte Verbindungen (HTTPS, TLS) und
              aktuelle Sicherheitsstandards. Dennoch kann bei der Datenübertragung im Internet kein absoluter Schutz
              gewährleistet werden.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">10. Änderungen dieser Datenschutzerklärung</h2>
            <p>
              Der Veranstalter behält sich vor, diese Datenschutzerklärung bei Bedarf anzupassen, z. B. bei Änderungen
              gesetzlicher Bestimmungen oder technischer Abläufe. Es gilt jeweils die auf der Website veröffentlichte
              aktuelle Version.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">11. Kontakt</h2>
            <p>
              Für Fragen zum Datenschutz oder zur Ausübung deiner Rechte:
              <br />
              <strong>[Vorname Nachname]</strong>
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
