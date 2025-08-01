"use client";

import { useState } from "react";
import { useSignalR } from "../hooks/useSignalR";
import { LocateIcon } from "lucide-react";

export default function UserA() {
  const [name, setName] = useState<string | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const { sendLocation } = useSignalR();

  const [isSending, setIsSending] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    lat?: string;
    lon?: string;
  }>({});

  const geoLocation = (): Promise<{ lat: number; lon: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        console.warn("Geolocation not supported!");
        return reject("Geolocation not supported");
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          resolve({ lat, lon });
        },
        (err) => {
          console.error("Error getting location", err);
          reject(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
        }
      );
    });
  };

  const sendLocationViaGps = async () => {
    try {
      setIsSending(true);
      const { lat, lon } = await geoLocation();
      sendLocation(lat, lon, name || "isteakahmedshupto@gmail.com");
    } catch (error) {
      console.error("Could not retrieve or send location", error);
    } finally {
      setIsSending(false);
    }
  };

  const validateErrors = () => {
    const newErrors: typeof errors = {};
    if (!name || name.trim() === "")
      newErrors.name = "Username / email is required";
    if (lat === null || isNaN(lat)) newErrors.lat = "Latitude is required";
    if (lon === null || isNaN(lon)) newErrors.lon = "Longitude is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLocation = () => {
    if (!validateErrors()) return;
    sendLocation(lat!, lon!, name!);
    setLat(null);
    setLon(null);
    setName(null);
  };

  return (
    <div className="p-4 w-[325px] md:w-[500px]">
      <h2 className="text-xl font-bold">User A (Sender)</h2>
      <div className="border-b border-neutral-300 pb-4">
        <p className="my-1.5">Email: {name}</p>
        <p className="italic">
          <span className="underline underline-offset-2">
            Latitude: {lat?.toFixed(6)}
          </span>{" "}
          -{" "}
          <span className="underline underline-offset-2">
            Longitude: {lon?.toFixed(6)}
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
            value={name || ""}
            aria-required="true"
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name}</p>
          )}
        </div>
        <div className="flex flex-col mb-1.5">
          <label htmlFor="lat" className="font-semibold mb-1.5">
            Latitude
          </label>
          <input
            type="number"
            id="lat"
            className="input"
            placeholder="Enter lat, ex: 23.8041"
            onChange={(e) => setLat(Number(e.target.value))}
            value={lat || ""}
            aria-required="true"
          />
          {errors.lat && (
            <p className="text-sm text-red-500 mt-1">{errors.lat}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="lon" className="font-semibold mb-1.5">
            Longitude
          </label>
          <input
            type="number"
            id="lon"
            className="input"
            placeholder="Enter lon, ex: 90.4152"
            onChange={(e) => setLon(Number(e.target.value))}
            value={lon || ""}
            aria-required="true"
          />
          {errors.lon && (
            <p className="text-sm text-red-500 mt-1">{errors.lon}</p>
          )}
        </div>
        <button
          className="btn btn-accent mt-3.5 mb-1.5"
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
