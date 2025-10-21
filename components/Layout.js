// RoepischeSpiele/components/Layout.js
import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();

  // Funktion: prüft, ob aktueller Pfad aktiv ist
  const isActive = (path) => router.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-4 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <img
              src="/pictures/roepischespiele.png"
              alt="Röpische Spiele Logo"
              className="w-12 h-12 rounded-md shadow-md bg-white/20"
            />
            <h1 className="text-xl md:text-2xl font-bold">
              🏆 Röpische Spiele 2026
            </h1>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/datenschutz" className="hover:underline">
              Datenschutz
            </Link>
            <Link href="/agb" className="hover:underline">
              AGBs
            </Link>
          </nav>
        </div>
      </header>

      {/* Sekundäre Navigation */}
      <nav className="bg-orange-100 border-t border-orange-200 shadow-sm">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4 md:gap-6 py-2 text-sm font-medium text-orange-800">
          <Link
            href="/"
            className={`px-3 py-1 rounded-lg ${
              isActive("/") ? "bg-orange-500 text-white" : "hover:text-orange-600"
            }`}
          >
            🏠 Startseite
          </Link>
          <Link
            href="/neuigkeiten"
            className={`px-3 py-1 rounded-lg ${
              isActive("/neuigkeiten")
                ? "bg-orange-500 text-white"
                : "hover:text-orange-600"
            }`}
          >
            🗞️ Neuigkeiten
          </Link>
          <Link
            href="/faq"
            className={`px-3 py-1 rounded-lg ${
              isActive("/faq") ? "bg-orange-500 text-white" : "hover:text-orange-600"
            }`}
          >
            ❓ FAQ
          </Link>
          <Link
            href="/anfahrt"
            className={`px-3 py-1 rounded-lg ${
              isActive("/anfahrt")
                ? "bg-orange-500 text-white"
                : "hover:text-orange-600"
            }`}
          >
            🚗 Anfahrt
          </Link>
          <Link
            href="/infos"
            className={`px-3 py-1 rounded-lg ${
              isActive("/infos") ? "bg-orange-500 text-white" : "hover:text-orange-600"
            }`}
          >
            ℹ️ Infos zum Event
          </Link>
          <Link
            href="/galerie"
            className={`px-3 py-1 rounded-lg ${
              isActive("/galerie")
                ? "bg-orange-500 text-white"
                : "hover:text-orange-600"
            }`}
          >
            📸 Galerie
          </Link>
        </div>
      </nav>

      {/* Hauptinhalt */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        © 2025 Röpische Spiele •{" "}
        <Link href="/datenschutz" className="underline hover:text-orange-600">
          Datenschutz
        </Link>{" "}
        •{" "}
        <Link href="/agb" className="underline hover:text-orange-600">
          AGBs
        </Link>
      </footer>
    </div>
  );
}
