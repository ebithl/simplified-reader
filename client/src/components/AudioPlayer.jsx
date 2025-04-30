// components/AudioPlayer.jsx
import React, { useRef, useState } from "react";

const AudioPlayer = ({ text, language, setHighlightedSentenceIndex }) => {
  const synthRef = useRef(window.speechSynthesis);
  const [isPaused, setIsPaused] = useState(false);
  const sentences = useRef([]);
  const indexRef = useRef(0);
  const currentUtterance = useRef(null);

  const handlePlay = () => {
    if (!text || synthRef.current.speaking) return;

    sentences.current = text.match(/[^.!?]+[.!?]+/g) || [text];
    indexRef.current = 0;
    speakSentence();
  };

  const speakSentence = () => {
    if (indexRef.current >= sentences.current.length) {
      setHighlightedSentenceIndex(null);
      return;
    }

    const sentence = sentences.current[indexRef.current];
    const utterance = new SpeechSynthesisUtterance(sentence);
    currentUtterance.current = utterance;
    utterance.lang = language;
    utterance.rate = 0.9;
    utterance.onstart = () => setHighlightedSentenceIndex(indexRef.current);
    utterance.onend = () => {
      indexRef.current++;
      if (!synthRef.current.paused && !synthRef.current.pending) {
        speakSentence();
      }
    };

    synthRef.current.speak(utterance);
  };

  const handlePause = () => {
    if (synthRef.current.speaking && !synthRef.current.paused) {
      synthRef.current.pause();
      setIsPaused(true);
    }
  };

  const handleResume = () => {
    if (synthRef.current.paused) {
      synthRef.current.resume();
      setIsPaused(false);
    }
  };

  const handleStop = () => {
    synthRef.current.cancel();
    setHighlightedSentenceIndex(null);
    setIsPaused(false);
  };

  const handleReset = () => {
    handleStop();
    indexRef.current = 0;
  };

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      <button onClick={handlePlay} className="bg-green-600 text-white px-4 py-2 rounded">
        🔊 Play Audio
      </button>
      <button onClick={handlePause} className="bg-yellow-500 text-white px-4 py-2 rounded">
        ⏸️ Pause
      </button>
      <button onClick={handleResume} className="bg-blue-600 text-white px-4 py-2 rounded">
        ▶️ Resume
      </button>
      <button onClick={handleStop} className="bg-red-600 text-white px-4 py-2 rounded">
        ⏹️ Stop
      </button>
      <button onClick={handleReset} className="bg-gray-700 text-white px-4 py-2 rounded">
        🔁 Reset
      </button>
    </div>
  );
};

export default AudioPlayer;
