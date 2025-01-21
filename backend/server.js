import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";

const CONFIG = {
  PORT: 3013,
  INACTIVE_TIMEOUT: 30 * 60 * 1000,
  CLEANUP_INTERVAL: 5 * 60 * 1000,
};

const SOCKET_CONFIG = {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["*"],
  },
  allowEIO3: true,
  transports: ["websocket", "polling"],
};

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, SOCKET_CONFIG);

const connectedUsers = new Map();
const activeConnections = new Set();
const typingTimeouts = new Map();
const messageHistory = new Map();

app.use(cors());

function isSocketActive(socketId) {
  return activeConnections.has(socketId) && connectedUsers.has(socketId);
}

function broadcastUserStatus() {
  try {
    const activeUsers = Array.from(connectedUsers.values()).filter((user) =>
      isSocketActive(user.id)
    );
    io.emit("users_count", activeUsers.length);
    io.emit("users_list", activeUsers);
  } catch (error) {
    console.error("Error broadcasting user status:", error);
  }
}

function cleanupInactiveUsers() {
  const now = new Date();
  let hasChanges = false;

  for (const socketId of activeConnections) {
    const user = connectedUsers.get(socketId);
    if (
      !user ||
      now.getTime() - user.lastActivity.getTime() > CONFIG.INACTIVE_TIMEOUT
    ) {
      activeConnections.delete(socketId);
      connectedUsers.delete(socketId);
      typingTimeouts.delete(socketId);
      hasChanges = true;
    }
  }

  if (hasChanges) broadcastUserStatus();
}

function handleTyping(socket, isTyping) {
  const user = connectedUsers.get(socket.id);
  if (!user) return;

  user.isTyping = isTyping;
  user.lastActivity = new Date();

  const typingUsers = Array.from(connectedUsers.values())
    .filter((u) => u.isTyping)
    .map((u) => ({
      id: u.id,
      username: u.username,
    }));

  io.emit("typing_users_updated", typingUsers);
}

function handleUserConnection(socket) {
  const initialUsername = `Anonymous${Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")}`;

  if (connectedUsers.has(socket.id)) {
    connectedUsers.delete(socket.id);
    activeConnections.delete(socket.id);
    typingTimeouts.delete(socket.id);
  }

  activeConnections.add(socket.id);
  connectedUsers.set(socket.id, {
    id: socket.id,
    username: initialUsername,
    connectedAt: new Date(),
    isTyping: false,
    lastActivity: new Date(),
  });

  return initialUsername;
}

io.on("connection", (socket) => {
  try {
    const initialUsername = handleUserConnection(socket);

    socket.on("send_message", (messageData) => {
      const user = connectedUsers.get(socket.id);
      if (!user) return;

      user.lastActivity = new Date();
      const enrichedMessage = {
        id: messageData.id,
        text: messageData.text,
        username: user.username,
        userId: socket.id,
        isUser: false,
        timestamp: new Date().toISOString(),
      };

      messageHistory.set(messageData.id, enrichedMessage);

      socket.emit("message_sent", { ...enrichedMessage, isUser: true });
      socket.broadcast.emit("receive_message", enrichedMessage);
    });

    socket.on("delete_message", ({ messageId }) => {
      const user = connectedUsers.get(socket.id);
      if (user) io.emit("message_deleted", messageId);
    });

    socket.on("edit_message", ({ messageId, newText }) => {
      const user = connectedUsers.get(socket.id);
      if (user) {
        io.emit("message_edited", {
          messageId,
          newText,
          editedBy: user.username,
          editedAt: new Date().toISOString(),
        });
      }
    });

    socket.emit("set_initial_username", initialUsername);

    socket.on("set_username", (newUsername) => {
      const user = connectedUsers.get(socket.id);
      if (user) {
        const oldUsername = user.username;
        user.username = newUsername;
        user.lastActivity = new Date();

        const updatedMessages = [];
        messageHistory.forEach((message, messageId) => {
          if (message.userId === socket.id) {
            message.username = newUsername;
            updatedMessages.push({
              messageId,
              newUsername,
              oldUsername,
            });
          }
        });

        io.emit("username_changed", {
          userId: socket.id,
          oldUsername,
          newUsername,
          updatedMessages,
        });

        broadcastUserStatus();
      }
    });

    socket.on("typing_start", () => handleTyping(socket, true));
    socket.on("typing_stop", () => handleTyping(socket, false));

    socket.on("disconnect", () => {
      const user = connectedUsers.get(socket.id);
      if (!user) return;

      if (user.isTyping) {
        socket.broadcast.emit("user_stopped_typing", {
          userId: socket.id,
          username: user.username,
        });
      }

      activeConnections.delete(socket.id);
      connectedUsers.delete(socket.id);
      typingTimeouts.delete(socket.id);
      broadcastUserStatus();
    });

    broadcastUserStatus();
  } catch (error) {
    console.error("Error handling socket connection:", error);
  }
});

setInterval(cleanupInactiveUsers, CONFIG.CLEANUP_INTERVAL);

httpServer.listen(CONFIG.PORT, () => {
  console.log(`Server is running on port ${CONFIG.PORT} 🚀`);
});
