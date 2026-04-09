const vision = require('@google-cloud/vision');
const path = require('path');
const check_all = require('./OCR_arrays/Check_all')
const http = require("http");
const cors = require("cors");
const express = require("express");
const app = express();
const fs = require("fs");
const port = process.env.PORT||3001;

app.use(cors());
const server = http.createServer(app);
//const array = ['Jay', 'FC','2', '58', 'Kevin', 'Team'];

const multer = require("multer");




// ---- MULTER SETUP (memory storage) ----
const upload = multer({
  storage: multer.memoryStorage(), // no disk storage needed
});

// ---- GOOGLE CLOUD VISION CLIENT SETUP ----
// Ensure the environment variable exists
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
  throw new Error("Missing GOOGLE_APPLICATION_CREDENTIALS_JSON");
}

// Write credentials to a temp file (Render-safe)
fs.writeFileSync(
  "/tmp/gcp-key.json",
  process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
);

// Create Vision client using the temp file
const client = new vision.ImageAnnotatorClient({
  keyFilename: "/tmp/gcp-key.json",
});

// Optional: verify file exists
console.log("GCP key file exists:", fs.existsSync("/tmp/gcp-key.json"));

app.post("/upload", upload.single("image"), async (req, res) => {
  try {

        const sequenceVar = req.body.FC; // ✅ get FC
    console.log("FC from frontend:", sequenceVar);

    const [result] = await client.textDetection({
      image: { content: req.file.buffer }, // 🔥 direct image data
    });

    const detections = result.textAnnotations;

    if (detections.length > 0) {
      const fullText = detections[0].description;
      const array = fullText.trim().split(/\s+/);

     const response_data = check_all(array, sequenceVar);

      res.json({
      result: response_data,

      });

     console.log(response_data) // undefined

     
    } else {
      res.json({ text: [] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("OCR failed");
  }
});

server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
