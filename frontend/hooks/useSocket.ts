import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Platform } from "react-native";

let globalSocket: Socket | null = null;

const SOCKET_CONFIG = {
  transports: ["websocket"],
  upgrade: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
};

const IOS_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const getSocketUrl = () => {
  const PORT = "3013";
  const HOST = Platform.OS === "android" ? "10.0.2.2" : "localhost";
  return `http://${HOST}:${PORT}`;
};

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (globalSocket) return;

    globalSocket = io(getSocketUrl(), {
      ...SOCKET_CONFIG,
      extraHeaders: Platform.OS === "ios" ? IOS_HEADERS : undefined,
    });

    globalSocket
      .on("connect", () => setIsConnected(true))
      .on("disconnect", () => setIsConnected(false))
      .on("connect_error", () => setIsConnected(false));

    return () => {
      if (!globalSocket) return;
      globalSocket.disconnect();
      globalSocket = null;
    };
  }, []);

  return { socket: globalSocket, isConnected };
};
