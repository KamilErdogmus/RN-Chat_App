import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

app.use(cors());

const connectedUsers = new Map();

io.on("connection", (socket) => {
  const userInfo = {
    id: socket.id,
    username: "Anonymous",
    connectedAt: new Date(),
    isTyping: false,
    lastActivity: new Date(),
  };

  // Kullanıcıyı Map'e ekle
  connectedUsers.set(socket.id, userInfo);

  // Bağlı kullanıcı sayısını ve listesini güncelle
  broadcastUserStatus();

  socket.on("set_username", (username) => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      user.username = username;
      broadcastUserStatus();
    }
  });

  socket.on("send_message", (message) => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      user.lastActivity = new Date();
      socket.broadcast.emit("receive_message", {
        ...message,
        username: user.username,
      });
    }
  });

  socket.on("typing", (data) => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      user.isTyping = true;
      user.lastActivity = new Date();

      socket.broadcast.emit("user_typing", {
        userId: socket.id,
        username: user.username,
      });

      // Typing durumunu 3 saniye sonra resetle
      setTimeout(() => {
        if (user.isTyping) {
          user.isTyping = false;
          socket.broadcast.emit("user_stopped_typing", {
            userId: socket.id,
            username: user.username,
          });
        }
      }, 3000);
    }
  });

  socket.on("disconnect", () => {
    // Kullanıcıyı Map'ten çıkar
    connectedUsers.delete(socket.id);

    // Bağlı kullanıcı sayısını ve listesini güncelle
    broadcastUserStatus();

    console.log(
      `User ${socket.id} disconnected. Total users: ${connectedUsers.size}`
    );
  });

  function broadcastUserStatus() {
    const usersList = Array.from(connectedUsers.values()).map((user) => ({
      id: user.id,
      username: user.username,
      isTyping: user.isTyping,
      lastActivity: user.lastActivity,
    }));

    io.emit("users_count", connectedUsers.size);
    io.emit("users_list", usersList);
  }

  // Aktif olmayan kullanıcıları temizle
  setInterval(() => {
    const now = new Date();
    for (const [id, user] of connectedUsers.entries()) {
      const inactiveTime = now.getTime() - user.lastActivity.getTime();
      if (inactiveTime > 30 * 60 * 1000) {
        // 30 dakika
        connectedUsers.delete(id);
        broadcastUserStatus();
      }
    }
  }, 5 * 60 * 1000); // 5 dakikada bir kontrol
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Test başarılı!" });
});

const PORT = 3013;
// app.listen yerine httpServer.listen kullanın
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
