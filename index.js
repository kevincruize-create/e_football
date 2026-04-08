const vision = require('@google-cloud/vision');
const path = require('path');
const check_all = require('./OCR_arrays/Check_all')
const http = require("http");
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT||3001;

app.use(cors());
const server = http.createServer(app);
//const array = ['Jay', 'FC','2', '58', 'Kevin', 'Team'];

const multer = require("multer");



const upload = multer({
  storage: multer.memoryStorage(), // 🚀 no disk storage
});
//const sequenceVar = 'Counter Football FC'; // or 'Kevin Team'


// 🔐 Ensure credentials exist (FAIL FAST)
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
  throw new Error("Missing GOOGLE_APPLICATION_CREDENTIALS_JSON");
}

const credentials = JSON.parse(
  process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
);

// 🔑 Fix private key formatting
credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');

const client = new vision.ImageAnnotatorClient({
  credentials,
});

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
