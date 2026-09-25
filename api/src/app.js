import express from "express";
import "dotenv/config";

const app = express();

app.use("/", (req, res) => {
  res.send("Meaningless");
});

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running on port: ${PORT}`);
});
