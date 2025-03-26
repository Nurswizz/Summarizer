import Navbar from "./components/Navbar";
import { useState } from "react";
import axios from "axios";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    console.log("Uploading file...");
    const data = new FormData();
    data.append("audioFile", selectedFile);

    try {
      const res = await axios.post("http://localhost:3000/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data);
      alert("File uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed. Try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center p-4 gap-4">
        <h1 className="text-4xl font-bold">Summarizer</h1>
        <p className="text-lg">Summarize your meeting content with ease!</p>
        <p className="text-md">
          Provide the audio of the video and get a full summary of the meeting.
        </p>
        <form className="flex flex-col justify-center items-center border-4 gap-5 p-5 rounded-3xl">
          <input
            type="file"
            className="border-2 p-2"
            onChange={handleFileChange}
            accept="audio/*"
          />
          <button
            type="button"
            className="bg-[#004080] pl-5 pr-5 p-2 rounded-3xl text-white"
            onClick={handleUpload}
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
