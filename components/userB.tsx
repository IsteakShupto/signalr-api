"use client";

import { useSignalR } from "@/hooks/useSignalR";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MapFlyTo = ({ lat, lon }: { lat: number; lon: number }) => {
  const map = useMap();

  useEffect(() => {
    if (lat !== null && lon !== null) map.flyTo([lat, lon], 15);
  }, [lat, lon, map]);

  return null;
};

export default function UserB() {
  const [location, setLocation] = useState<{
    lat: number;
    lon: number;
    userName: string;
  } | null>(null);

  useSignalR((data: { lat: number; lon: number; userName: string }) => {
    console.log(`Received:`, data);
    setLocation(data);
  });

  return (
    <div className="p-4 h-[500px] w-full">
      <h2 className="text-xl font-bold mb-2">User B (Receiver)</h2>

      {location ? (
        <MapContainer
          center={[location.lat, location.lon]}
          zoom={15}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapFlyTo lat={location.lat} lon={location.lon} />

          <Marker position={[location.lat, location.lon]} icon={markerIcon}>
            <Popup>{location.userName}</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>
          Receiving location, please wait{" "}
          <span className="loading loading-xs loading-spinner"></span>
        </p>
      )}
    </div>
  );
}
