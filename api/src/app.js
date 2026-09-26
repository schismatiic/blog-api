import express from "express";
import authRouter from "./routes/authRouter.js";
import postRouter from "./routes/postRouter.js";
import "dotenv/config";

const app = express();

app.use(express.json());

// Routes
app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/", (req, res) => {
  res.send("Meaningless");
});
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

// PORT and server
const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running on port: ${PORT}`);
});
