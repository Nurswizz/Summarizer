require("dotenv").config();
const OpenAI = require("openai");
const openai = new OpenAI(process.env.OPENAI_API_KEY);

const fs = require("fs");

const convertAudioToText = async (audioPath) => {
    const audioFile = fs.createReadStream(audioPath);
    const transcription = await openai.audio.transcriptions.create({
        file: audioFile,
        model: "gpt-4o-transcribe", 
    });
    return transcription.text;
};

convertAudioToText("uploads/audio.mp3")
    .then((text) => console.log(text))
    .catch((error) => console.error("Error:", error));
