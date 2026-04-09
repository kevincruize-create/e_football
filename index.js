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



// Read the secret file
const secretPath = "/etc/secrets/fifa.json";
const rawData = fs.readFileSync(secretPath, "utf8"); // 🔹 read file as string
const credentials = JSON.parse(rawData);             // 🔹 parse JSON

// Create Vision client
const client = new vision.ImageAnnotatorClient({ credentials });

console.log("Loaded Google service account:", credentials.client_email);

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
