import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

const SIGNAL_URL = "https://tech-test.raintor.com/Hub";

export function useSignalR(
  onReceive?: (data: { lat: number; lon: number; userName: string }) => void
) {
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(SIGNAL_URL, { withCredentials: false })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connectionRef.current = connection;

    connection.start().catch(console.error);

    if (onReceive) {
      connection.on("ReceiveLatLon", onReceive);
    }

    return () => {
      connection.stop();
    };
  }, [onReceive]);

  const sendLocation = (lat: number, lon: number, userName: string) => {
    connectionRef.current
      ?.invoke("SendLatLon", lat, lon, userName)
      .catch(console.error);
  };

  return {
    sendLocation,
  };
}
