// components/LanguageSelector.jsx
import React from "react";

const LanguageSelector = ({ language, setLanguage }) => {
  return (
    <div>
      <label className="block mb-1 font-medium">Select Language</label>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="en">English</option>
        <option value="ml">Malayalam</option>
        <option value="hi">Hindi</option>
      </select>
    </div>
  );
};

export default LanguageSelector;