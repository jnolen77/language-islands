const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const generateIsland = require("./services/openaiService"); // this is the AI logic

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/generate-island", async (req, res) => {
  try {
    const {
      age,
      city,
      profession,
      relationship,
      language,
      topic,
      likes,
      dislikes,
    } = req.body;

    // ✅ Only check for required field: language
    if (!language) {
      return res.status(400).json({ error: "Language is required." });
    }

    const response = await generateIsland({
      age,
      city,
      profession,
      relationship,
      language,
      topic,
      likes,
      dislikes,
    });

    res.json({ output: response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate language island." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

const generateAudio = require("./services/ttsService");
const fs = require("fs");
const path = require("path");

app.post("/api/tts", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required." });
  }

  try {
    const audioBuffer = await generateAudio(text);

    const tempFilePath = path.join(__dirname, "temp", `${Date.now()}.mp3`);
    fs.writeFileSync(tempFilePath, audioBuffer);

    res.sendFile(tempFilePath, () => {
      fs.unlink(tempFilePath, () => {}); // delete file after sending
    });
  } catch (err) {
    res.status(500).json({ error: "TTS failed." });
  }
});
