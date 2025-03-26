const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 3000;
const convert = require("./utils/convert");

app.use(cors());

app.use(fileUpload());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  return res.send("Welcome to Meeting Summarizer!");
});

app.post("/upload", async (req, res) => {
  if (!req.files || !req.files.audioFile) {
    return res.status(400).send("No file uploaded.");
  }
  try {
    const audioFile = req.files.audioFile;
    const text = await convert(audioFile);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error.");
  }
  return res.send({ text }).status(200);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
