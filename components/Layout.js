// RoepischeSpiele/components/Layout.js
export default function Layout({ children }) {
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
            <a href="/datenschutz" className="hover:underline">
              Datenschutz
            </a>
            <a href="/agb" className="hover:underline">
              AGBs
            </a>
          </nav>
        </div>
      </header>

      {/* Hauptinhalt */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        © 2025 Röpische Spiele •{" "}
        <a href="/datenschutz" className="underline hover:text-orange-600">
          Datenschutz
        </a>{" "}
        •{" "}
        <a href="/agb" className="underline hover:text-orange-600">
          AGBs
        </a>
      </footer>
    </div>
  );
}
