"use client";

import { useState, useEffect } from "react";
import { useSignalR } from "../hooks/useSignalR";
// import { LocateIcon } from "lucide-react";

export default function UserA() {
  const [name, setName] = useState("isteakahmedshupto@gmail.com");
  const [lat, setLat] = useState(23.8103);
  const [lon, setLon] = useState(90.4125);
  const { sendLocation } = useSignalR();

  useEffect(() => {
    const interval = setInterval(() => {
      sendLocation(lat, lon, name);
    }, 5000);

    return () => clearInterval(interval);
  }, [lat, lon, name, sendLocation]);

  const handleLocation = () => {
    sendLocation(lat, lon, name);
  };

  return (
    <div className="p-4 w-[500px]">
      <h2 className="text-xl font-bold">User A (Sender)</h2>
      <div className="border-b border-neutral-300 pb-4">
        <p className="my-1.5 text-lg">Email: {name}</p>
        <p className="italic">
          <span className="underline underline-offset-2">
            Latitude: {lat.toFixed(6)}
          </span>{" "}
          -{" "}
          <span className="underline underline-offset-2">
            Longitude: {lon.toFixed(6)}
          </span>
        </p>
      </div>
      <div className="mt-1.5 p-2.5 border-b border-neutral-300 pb-4">
        <div className="flex flex-col mb-1.5">
          <label htmlFor="email" className="font-semibold mb-1.5">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="input"
            placeholder="Ex. isteakahmedshupto@gmail.com"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-1.5">
          <label htmlFor="lat" className="font-semibold mb-1.5">
            Latitude
          </label>
          <input
            type="number"
            id="lat"
            className="input"
            placeholder="Enter lat, ex: 25.737"
            onChange={(e) => setLat(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lon" className="font-semibold mb-1.5">
            Longitude
          </label>
          <input
            type="number"
            id="lon"
            className="input"
            placeholder="Enter lon, ex: 25.737"
            onChange={(e) => setLon(Number(e.target.value))}
          />
        </div>
        <button
          className="btn btn-primary mt-3.5 mb-1.5"
          onClick={handleLocation}
        >
          Send email & location
        </button>
      </div>
      {/* <div>
        <button className="btn mt-5">
          <LocateIcon /> Send your location
        </button>
      </div> */}
    </div>
  );
}
