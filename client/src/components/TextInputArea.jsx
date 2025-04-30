// components/TextInputArea.jsx
import React from "react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const TextInputArea = ({ inputText, setInputText, setSimplifiedText, language }) => {
  const handleSimplify = async () => {
    const response = await fetch(`${baseUrl}/api/simplify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: inputText, language })
    });
    const data = await response.json();
    setSimplifiedText(data.simplified);
  };

  return (
    <div>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="w-full p-2 border rounded h-40"
        placeholder="Enter or upload text to simplify"
      />
      <button onClick={handleSimplify} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
        Simplify
      </button>
    </div>
  );
};

export default TextInputArea;