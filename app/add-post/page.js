"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import QEditor from "@/components/QEditor";
import ReactQuill from "react-quill";
import "quill/dist/quill.bubble.css";

export default function addPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [post, setPost] = useState({});
  const [preview, setPreview] = useState(false);

  const router = useRouter();

  const titleEventHandler = (event) => {
    setTitle(event.target.value);
  };

  const contentEventHandler = (event) => {
    setContent(event);
  };

  const handlePreview = (event) => {
    event.preventDefault();
    setPreview(!preview);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Double check that the fields are not empty
    if (title !== "" && content !== "") {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        setTitle("");
        setContent("");
        router.push("/");
      }
    } else {
      alert("Fields are empty!");
    }
  };
  return (
    <div className="bg-white p-0 m-0">
      {post ? (
        <div>
          <form onSubmit={handleSubmit}>
            <ul className="flex flex-col items-center list-none">
              <li className="w-full h-auto my-2 px-5 py-10 rounded text-center shadow text-black">
                {preview ? (
                  <div>
                    <label className="block font-sans text-2xl text-center text-black">
                      {title}
                    </label>
                    <ReactQuill
                      theme="bubble"
                      value={content || ""}
                      readOnly={true}
                      className="text-black"
                    />
                    <div className="flex flex-row justify-around w-full">
                      <button
                        className="text-sm bg-gray-600 text-white border-0 rounded-md w-32 h-9 px-2.5 cursor-pointer"
                        onClick={handlePreview}
                      >
                        Close Preview
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block font-sans text-2xl pb-4 text-left text-black">
                      Document Title
                    </label>
                    <input
                      className="block w-80 h-9 font-sans text-sm p-5 border border-gray-400 rounded bg-white text-black"
                      defaultValue={title}
                      type="text"
                      onChange={titleEventHandler}
                    />
                    <label className="block font-sans text-2xl py-4 text-left text-black">
                      Text Content
                    </label>

                    <QEditor onChange={contentEventHandler} value={content} />

                    <div className="flex flex-row justify-around w-full">
                      <button
                        className="text-xs bg-blue-600 text-white border-0 rounded-md w-28 h-9 px-2 cursor-pointer"
                        onClick={handlePreview}
                      >
                        Preview
                      </button>
                      <button
                        className="text-xs bg-green-600 text-white border-0 rounded-md w-28 h-9 px-2 cursor-pointer"
                        type="submit"
                      >
                        Create document
                      </button>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
