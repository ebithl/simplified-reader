// components/SimplifiedOutput.jsx
import React from "react";

const SimplifiedOutput = ({ simplifiedText, highlightedSentenceIndex }) => {
  if (!simplifiedText) return null;

  const sentences = simplifiedText.match(/[^.!?]+[.!?]+/g) || [simplifiedText];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Simplified Output</h2>
      <p className="leading-relaxed">
        {sentences.map((sentence, index) => (
          <span
            key={index}
            className={
              index === highlightedSentenceIndex ? "bg-yellow-200 px-1" : undefined
            }
          >
            {sentence + " "}
          </span>
        ))}
      </p>
    </div>
  );
};

export default SimplifiedOutput;