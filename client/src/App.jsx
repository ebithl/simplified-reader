// App.jsx
import React from "react";
import FileUploader from "./components/FileUploader";
import TextInputArea from "./components/TextInputArea";
import SimplifiedOutput from "./components/SimplifiedOutput";
import LanguageSelector from "./components/LanguageSelector";
import AudioPlayer from "./components/AudioPlayer";
import DownloadButton from "./components/DownloadButton";

function App() {
  const [inputText, setInputText] = React.useState("");
  const [simplifiedText, setSimplifiedText] = React.useState("");
  const [language, setLanguage] = React.useState("en");
  const [highlightedSentenceIndex, setHighlightedSentenceIndex] = React.useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Simplified Content Reader</h1>
        <LanguageSelector language={language} setLanguage={setLanguage} />
        <FileUploader setInputText={setInputText} />
        <TextInputArea inputText={inputText} setInputText={setInputText} setSimplifiedText={setSimplifiedText} language={language} />
        <SimplifiedOutput simplifiedText={simplifiedText} highlightedSentenceIndex={highlightedSentenceIndex} />
        <AudioPlayer text={simplifiedText} language={language} setHighlightedSentenceIndex={setHighlightedSentenceIndex} />
        <DownloadButton simplifiedText={simplifiedText} />
      </div>
    </div>
  );
}

export default App;