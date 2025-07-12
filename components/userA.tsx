"use client";

import { useState, useEffect } from "react";
import { useSignalR } from "../hooks/useSignalR";
import { LocateIcon } from "lucide-react";

export default function UserA() {
  const [name, setName] = useState("isteakahmedshupto@gmail.com");
  const [lat, setLat] = useState(23.8103);
  const [lon, setLon] = useState(90.4125);
  const { sendLocation } = useSignalR();

  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      sendLocation(lat, lon, name);
    }, 2000);

    return () => clearInterval(interval);
  }, [lat, lon, name, sendLocation]);

  const geoLocation = () => {
    if (!navigator.geolocation) {
      console.warn(`Geolocation not supported!`);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLon(pos.coords.longitude);
      },
      (err) => console.error(`Error getting location`, err),
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  const sendLocationViaGps = async () => {
    await geoLocation();

    if (!lat || !lon) {
      console.warn(`Not ready to send location`);
      return;
    }

    try {
      setIsSending(true);
      sendLocation(lat, lon, name);
    } catch (error) {
      console.error(`Sending lat / lon failed`, error);
    } finally {
      setIsSending(false);
    }
  };

  const handleLocation = () => {
    sendLocation(lat, lon, name);
  };

  return (
    <div className="p-4 w-[220px] md:w-[500px]">
      <h2 className="text-xl font-bold">User A (Sender)</h2>
      <div className="border-b border-neutral-300 pb-4">
        <p className="my-1.5">Email: {name}</p>
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
      <div className="mt-1.5 p-2.5 pb-4">
        <div className="flex flex-col mb-1.5">
          <label htmlFor="email" className="font-semibold mb-1.5">
            Email / Username
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
      <div className="flex items-center gap-4">
        <div className="flex-grow border-t border-gray-300" />
        <p className="text-center text-2xl font-semibold">OR</p>
        <div className="flex-grow border-t border-gray-300" />
      </div>
      <div className="mx-auto w-fit">
        <button className="btn mt-5" onClick={sendLocationViaGps}>
          {isSending ? (
            <span>
              Sending your location{" "}
              <span className="loading loading-xs loading-spinner"></span>
            </span>
          ) : (
            <>
              <LocateIcon /> Detect & Send your location
            </>
          )}
        </button>
      </div>
    </div>
  );
}
