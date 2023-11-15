"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
//import ReactQuill from "react-quill";
import "quill/dist/quill.bubble.css";
import { checkUser } from "../utils/auth";
import dynamic from "next/dynamic";

// Dynamic import with SSR set to false, because QUILL uses document
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);
// #####################################################################

export default function ShowPost() {
  const [content, setContent] = useState("");
  const [post, setPost] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("pid");

  
  useEffect(() => {
    setCurrentUserId(localStorage.getItem("userId"));
  }, []);

  useEffect(() => {
    const getPost = async () => {
      const res = await fetch("api/posts/" + postId);
      const data = await res.json();

      setPost(data[0]);
      console.log(data[0]);

      if (res.ok) {
        setContent(data[0].content);
      }
      setIsLoading(false);
    };
    if (postId) getPost();
  }, [postId]);

  const closePreview = (event) => {
    router.push("/");
  };

  useEffect(() => {
    setIsLoggedIn(checkUser());
  }, []);

  if (isLoading) { 
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-0 m-0">
      {isLoggedIn ? (
        post && (post.isPublic || Number(post.authorId) === Number(currentUserId)) ? (
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
                    {post.lastUpdated ? new Date(post.lastUpdated).toISOString().slice(0, 19).replace('T', ' ') : 'Loading...'} (last time edited)
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
          <div className="text-red-500">
            {post ? "You do not have permission to view this post." : "Loading post..."}
          </div>
        )
      ) : (
        <div className="text-red-500">Please log in to view this post.</div>
      )}
    </div>
  );
  
}
