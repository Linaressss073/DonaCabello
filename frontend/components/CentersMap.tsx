"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Center } from "@/types";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icons
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface CentersMapProps {
  centers: Center[];
}

const DEFAULT_CENTER: [number, number] = [4.710989, -74.072092]; // Bogotá

export function CentersMap({ centers }: CentersMapProps) {
  const centersWithCoords = centers.filter((c) => c.latitude && c.longitude);

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={6}
      className="h-full w-full rounded-lg"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {centersWithCoords.map((center) => (
        <Marker key={center.id} position={[center.latitude, center.longitude]} icon={icon}>
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">{center.name}</p>
              <p className="text-gray-600">{center.address}, {center.city}</p>
              {center.phone && <p className="text-gray-600">{center.phone}</p>}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
