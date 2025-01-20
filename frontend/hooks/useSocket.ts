import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3013", {
      transports: ["websocket"],
      upgrade: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.on("connect", () => {
      setIsConnected(true);
      setError(null);
      console.log("Connected to server", socketRef.current?.id);
    });

    socketRef.current.on("connect_error", (err) => {
      setError(`Connection error: ${err.message}`);
      console.error("Connection error:", err);
    });

    socketRef.current.on("disconnect", (reason) => {
      setIsConnected(false);
      console.log("Disconnected:", reason);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return {
    socket: socketRef.current,
    isConnected,
    error,
  };
};
