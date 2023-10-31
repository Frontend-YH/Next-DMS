"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ReactQuill from "react-quill";
import "quill/dist/quill.bubble.css";

export default function ShowPost() {
  const [content, setContent] = useState("");
  const [post, setPost] = useState({});

  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("pid");

  useEffect(() => {
    const getPost = async () => {
      const res = await fetch("api/posts/" + postId);
      const data = await res.json();

      setPost(data[0]);

      if (res.ok) {
        setContent(data[0].content);
      }
    };
    if (postId) getPost();
  }, [postId]);

  const closePreview = (event) => {
    router.push("/");
  };

  return (
    <div className="bg-white p-0 m-0">
      {post ? (
        <div>
          <ul className="flex flex-col items-center list-none">
            <li className="w-full h-auto my-2 px-5 py-10 rounded text-center shadow text-black">
              <div>
                <label className="block font-sans text-2xl text-center text-black">
                  {post.title}
                </label>
                <ReactQuill
                  theme="bubble"
                  value={content || ""}
                  readOnly={true}
                />
                <label className="block font-sans text-sm text-center text-gray-600 my-2">
                  Timestamp: {post.date} (last time edited)
                </label>
                <div className="flex flex-row justify-around w-full">
                  <button
                    className="text-sm bg-gray-600 text-white border-0 rounded-md w-32 h-9 px-2.5 cursor-pointer"
                    onClick={closePreview}
                  >
                    Close Document
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
