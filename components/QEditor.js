"use client";

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QEditor = ({ onChange, value }) => {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote"],
      ["bold", "italic", "underline"],
      [{ color: [] }],
      ["link"],
    ],
  };

  const handleEditorChange = (content) => {
    onChange(content); // Call the parent component's callback function
  };

  return (
    <div className="bg-white text-black mb-5">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleEditorChange}
        modules={modules}
        className="bg-white"
      />
    </div>
  );
};

export default QEditor;
