import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/api/test", (req, res) => {
  res.json({ message: "Test başarılı!" });
});

const PORT = 3013;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
