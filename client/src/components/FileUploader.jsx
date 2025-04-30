//// components/FileUploader.jsx
//import React from "react";
////import * as pdfjsLib from "pdfjs-dist";
//
//import { pdfjs } from "pdfjs-dist";
//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
//
//const FileUploader = ({ setInputText }) => {
//  const handleFile = async (e) => {
//    const file = e.target.files[0];
//    if (file) {
//      const data = await file.arrayBuffer();
//      //const pdf = await pdfjsLib.getDocument({ data }).promise;
//      const pdf = await pdfjs.getDocument({ data }).promise;
//      const page = await pdf.getPage(1);
//      const content = await page.getTextContent();
//      const text = content.items.map(item => item.str).join(" ");
//      setInputText(text);
//    }
//  };
//
//  return (
//    <div>
//      <label className="block mb-1 font-medium">Upload PDF</label>
//      <input type="file" accept="application/pdf" onChange={handleFile} className="w-full" />
//    </div>
//  );
//};
//
//export default FileUploader;

///////////////////////////////////////
//import React from "react";
//import { PDFDocument } from "pdf-lib";
//
//const FileUploader = ({ setInputText }) => {
//  const handleFile = async (e) => {
//    const file = e.target.files[0];
//    if (!file) return;
//
//    const arrayBuffer = await file.arrayBuffer();
//    const pdfDoc = await PDFDocument.load(arrayBuffer);
//    const pages = pdfDoc.getPages();
//    const textContent = await Promise.all(
//      pages.map((page) => page.getTextContent?.() || Promise.resolve({ items: [] }))
//    );
//
//    // Fallback simple solution to get page text (pdf-lib doesn't extract text well)
//    // So instead, just use a basic placeholder
//    const text = `[Placeholder] PDF loaded: ${pages.length} pages.`;
//
//    setInputText(text);
//  };
//
//  return (
//    <div>
//      <label className="block mb-1 font-medium">Upload PDF</label>
//      <input type="file" accept="application/pdf" onChange={handleFile} className="w-full" />
//    </div>
//  );
//};
//
//export default FileUploader;
//


//// components/FileUploader.jsx
//import React from "react";
//
//const FileUploader = ({ setInputText }) => {
//  const handleFile = async (e) => {
//    const file = e.target.files[0];
//    if (!file) return;
//
//    const formData = new FormData();
//    formData.append("pdf", file);
//
//    const response = await fetch("http://localhost:5000/api/upload-pdf", {
//      method: "POST",
//      body: formData,
//    });
//
//    const data = await response.json();
//    setInputText(data.text || "Failed to extract text");
//  };
//
//  return (
//    <div>
//      <label className="block mb-1 font-medium">Upload PDF</label>
//      <input type="file" accept="application/pdf" onChange={handleFile} className="w-full" />
//    </div>
//  );
//};
//
//export default FileUploader;


//import React, { useState } from "react";
//
//const FileUploader = ({ setInputText }) => {
//  const [pages, setPages] = useState([]);
//  const [currentPage, setCurrentPage] = useState(0);
//
//  const handleFile = async (e) => {
//    const file = e.target.files[0];
//    if (!file) return;
//
//    const formData = new FormData();
//    formData.append("pdf", file);
//
//    const res = await fetch("http://localhost:5000/api/upload-pdf-pages", {
//      method: "POST",
//      body: formData,
//    });
//
//    const data = await res.json();
//    setPages(data.pages || []);
//    setCurrentPage(0);
//    setInputText(data.pages?.[0] || "");
//  };
//
//  const goToPage = (index) => {
//    setCurrentPage(index);
//    setInputText(pages[index]);
//  };
//
//  return (
//    <div className="space-y-2">
//      <label className="block font-medium">Upload PDF</label>
//      <input type="file" accept="application/pdf" onChange={handleFile} className="w-full" />
//      {pages.length > 0 && (
//        <div className="mt-2">
//          <label className="block font-medium">Select Page</label>
//          <select
//            value={currentPage}
//            onChange={(e) => goToPage(parseInt(e.target.value))}
//            className="w-full border p-1"
//          >
//            {pages.map((_, i) => (
//              <option key={i} value={i}>
//                Page {i + 1}
//              </option>
//            ))}
//          </select>
//        </div>
//      )}
//    </div>
//  );
//};
//
//export default FileUploader;


// components/FileUploader.jsx
import React, { useState } from "react";

const FileUploader = ({ setInputText }) => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("pdf", file);

    const res = await fetch("http://localhost:5000/api/upload-pdf-pages", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setPages(data.pages || []);
    setCurrentPage(0);
    setInputText(data.pages?.[0] || "");
  };

  const goToPage = (index) => {
    setCurrentPage(index);
    setInputText(pages[index]);
  };

  return (
    <div className="space-y-2">
      <label className="block font-medium">Upload PDF</label>
      <input type="file" accept="application/pdf" onChange={handleFile} className="w-full" />
      {pages.length > 0 && (
        <div className="mt-2">
          <label className="block font-medium">Select Page</label>
          <select
            value={currentPage}
            onChange={(e) => goToPage(parseInt(e.target.value))}
            className="w-full border p-1"
          >
            {pages.map((_, i) => (
              <option key={i} value={i}>
                Page {i + 1}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
