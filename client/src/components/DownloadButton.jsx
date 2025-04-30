// components/DownloadButton.jsx
import React from "react";

const DownloadButton = ({ simplifiedText }) => {
  const handleDownload = () => {
    const blob = new Blob([simplifiedText], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "simplified_output.txt";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  if (!simplifiedText) return null;

  return (
    <button
      onClick={handleDownload}
      className="mt-2 bg-purple-600 text-white px-4 py-2 rounded"
    >
      Download Simplified Text
    </button>
  );
};

export default DownloadButton;