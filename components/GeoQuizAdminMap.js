import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// 🧩 Standard Leaflet Marker Icons (Vercel-kompatibel)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// 🟢 Icon für die Lösungsposition
const greenIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-green.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

export default function GeoQuizAdminMap({ shownEntries, showSolution, solution }) {
  return (
    <MapContainer
      center={[51.1657, 10.4515]} // Deutschland Mitte
      zoom={6}
      style={{ height: "100%", width: "100%" }}
    >
      {/* 🌍 Karte ohne Städtenamen */}
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
      />

      {/* 🔵 Teilnehmer-Marker mit Name darunter */}
      {shownEntries.map((entry) => (
        <Marker key={entry.id} position={[entry.latitude, entry.longitude]}>
          <Tooltip
            direction="bottom"
            offset={[0, 20]}
            opacity={1}
            permanent
            className="font-semibold bg-white text-gray-800 border rounded px-1 shadow-sm"
          >
            {entry.name}
          </Tooltip>
          <Popup>
            <strong>{entry.name}</strong>
            <br />
            {new Date(entry.created_at).toLocaleString("de-DE")}
          </Popup>
        </Marker>
      ))}

      {/* 🟢 Lösungsmarker */}
      {showSolution && solution && (
        <Marker
          position={[solution.lat, solution.lng]}
          icon={greenIcon}
        >
          <Tooltip
            direction="bottom"
            offset={[0, 20]}
            opacity={1}
            permanent
            className="font-bold text-green-700 bg-white border rounded px-1 shadow-sm"
          >
            ✅ {solution.name}
          </Tooltip>
          <Popup>
            <strong>✅ Lösung: {solution.name}</strong>
            <br />
            {solution.beschreibung}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
