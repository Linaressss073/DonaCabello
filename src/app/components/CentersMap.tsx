import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { MapPin, Star, Phone, Calendar } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from './ui/button';
import type { Center } from '../../types';

const MAP_CENTER: [number, number] = [4.6568, -74.0692]; // Bogotá

interface CentersMapProps {
  centers: Center[];
  selectedId?: string | null;
  onSelectCenter?: (center: Center) => void;
}

export function CentersMap({ centers, selectedId, onSelectCenter }: CentersMapProps) {
  const centersWithCoords = centers.filter((c) => c.lat != null && c.lng != null);

  return (
    <MapContainer
      center={MAP_CENTER}
      zoom={12}
      style={{ width: '100%', height: '100%', borderRadius: '0.5rem' }}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {centersWithCoords.map((center) => (
        <CircleMarker
          key={center.id}
          center={[center.lat!, center.lng!]}
          radius={14}
          pathOptions={{
            fillColor: center.id === selectedId ? '#9d174d' : '#db2777',
            fillOpacity: 1,
            color: '#fff',
            weight: 3,
          }}
          eventHandlers={{
            click: () => onSelectCenter?.(center),
          }}
        >
          <Popup>
            <div className="min-w-[170px] text-sm font-sans">
              <p className="font-semibold text-gray-800 mb-1">{center.nombre}</p>
              <p className="text-gray-500 text-xs mb-1 flex items-center gap-1">
                <MapPin size={11} className="text-pink-500 shrink-0" />
                {center.direccion}
              </p>
              <p className="text-yellow-700 text-xs mb-1 flex items-center gap-1">
                <Star size={11} className="fill-yellow-400 stroke-yellow-400" />
                {center.rating} ({center.reviews} reseñas)
              </p>
              <p className="text-gray-500 text-xs mb-3 flex items-center gap-1">
                <Phone size={11} />
                {center.telefono}
              </p>
              <Link to="/donar/agendar">
                <button
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white text-xs font-medium py-1.5 px-3 rounded transition-colors flex items-center justify-center gap-1"
                >
                  <Calendar size={11} />
                  Agendar cita
                </button>
              </Link>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
