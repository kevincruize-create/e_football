const vision = require('@google-cloud/vision');
const path = require('path');
const check_all = require('./OCR_arrays/Check_all')
//const array = ['Jay', 'FC','2', '58', 'Kevin', 'Team'];
const sequenceVar = 'insta: jeli.toq'; // or 'Kevin Team'


//check_all(array, sequenceVar)
const client = new vision.ImageAnnotatorClient({
  keyFilename: path.join(__dirname, 'fifa.json'),
});

async function detectText() {
  const [result] = await client.textDetection('C:/Users/user/Downloads/Rank.png');
  const detections = result.textAnnotations;

  if (detections.length > 0) {
    const fullText = detections[0].description;

    // Convert text into array of words
    const array = fullText.trim().split(/\s+/);

    console.log('Words array:', array);
   // console.log('Number of words:', wordsArray.length);
    check_all(array, sequenceVar)
  } else {
    console.log('No text found.');
  }

  

}

detectText();