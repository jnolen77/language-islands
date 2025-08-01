const axios = require("axios");
require("dotenv").config();

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

async function generateAudio(text, voiceId = "TxGEqnHWrfWFTfGW9XjX") {
  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      },
      {
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        responseType: "arraybuffer",
      }
    );

    return response.data; // audio binary
  } catch (err) {
    console.error("TTS generation failed:", err.message);
    throw new Error("Failed to generate audio.");
  }
}

module.exports = generateAudio;
