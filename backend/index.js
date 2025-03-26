const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const axios = require("axios");
const FormData = require("form-data"); // Import FormData

const app = express();
const port = 3000;

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

    // Prepare form-data
    const formData = new FormData();
    formData.append("file", audioFile.data, audioFile.name); 

    // Send file to FastAPI
    const response = await axios.post("http://127.0.0.1:8000/transcribe", formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    return res.status(200).json({ text: response.data.transcription });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error.");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
