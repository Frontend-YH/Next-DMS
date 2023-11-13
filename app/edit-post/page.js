"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import QEditor from "@/components/QEditor";
import ReactQuill from "react-quill";
import "quill/dist/quill.bubble.css";
import ListDocumentBtn from "@/components/ListDocumentBtn";

export default function editPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [post, setPost] = useState({});
  const [preview, setPreview] = useState(false);
  const [isPublic, setIsPublic] = useState(1);
  const [authorId, setAuthorId] = useState(1);
  const [lastUpdated, setLastUpdated] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [categories, setCategories] = useState([]);

  const selectRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    // Perform localStorage action
    setAuthorId(localStorage.getItem("userId") || 1);
  }, []);

  const searchParams = useSearchParams();
  const postId = searchParams.get("pid");

  useEffect(() => {
    const getPost = async () => {
      const res = await fetch("api/posts/" + postId);
      const data = await res.json();

      setPost(data[0]);

      if (res.ok) {
        setTitle(data[0].title);
        setContent(data[0].content);
        //console.log(data[0].categoryId);
        setCategoryId(data[0].categoryId);
        setIsPublic(data[0].isPublic);
      }
    };
    if (postId) getPost();
  }, [postId]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("/api/categories");
      const cats = await res.json();

      setCategories(cats);
    };

    getCategories();
  }, []);

  const titleEventHandler = (event) => {
    setTitle(event.target.value);
  };

  const handlePrivate = (event) => {
    setIsPublic(event.target.checked ? 0 : 1);
    console.log(isPublic);
  };

  // ############# Category Handling #################################################
  const handleCategory = (event) => {
    setCategoryId(event.target.value);
    //console.log(categoryId);
  };
  // ####################################################################################

  const contentEventHandler = (event) => {
    setContent(event);
  };

  const handlePreview = (event) => {
    event.preventDefault();
    setPreview(!preview);
  };

  const handleDelete = async (postId) => {
    const res = await fetch("/api/posts/" + postId, {
      method: "DELETE",
    });

    if (res.ok) {
      window.location.reload();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let postIdx = 15;

    const currentTime = new Date();
    const timeStamp = currentTime.toISOString().slice(0, 19).replace("T", " ");
    const lastUpdated = timeStamp;

    setLastUpdated(timeStamp);

    const res = await fetch("/api/posts/" + postId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        authorId,
        categoryId,
        isPublic,
        lastUpdated,
      }),
    });

    if (res.ok) {
      router.push("/");
    }
  };

  let selected = "";

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
                      className="block w-80 h-9 font-sans text-sm p-5 border border-gray-400 rounded-md bg-white text-black"
                      defaultValue={title}
                      type="text"
                      onChange={titleEventHandler}
                    />
                    <div className="flex justify-between items-center">
                      <label className="block font-sans text-2xl py-4 text-left text-black">
                        Text Content
                      </label>
                      <ListDocumentBtn />
                    </div>

                    <QEditor onChange={contentEventHandler} value={content} />

                    <div className="flex flex-col md:flex-row justify-around md:justify-end w-full items-center space-x-2 md:space-x-4">
                      <div className="flex flex-row mb-4 md:mb-0 items-center">
                        <div className="flex items-center">
                          {isPublic === 0 ? (
                            <input
                              className="mr-2 text-center rounded-lg"
                              type="checkbox"
                              id="option1"
                              name="option"
                              value="private"
                              checked="true"
                              onChange={handlePrivate}
                            />
                          ) : (
                            <input
                              className="mr-2 text-center rounded-lg"
                              type="checkbox"
                              id="option1"
                              name="option"
                              value="private"
                              onChange={handlePrivate}
                            />
                          )}

                          <label htmlFor="option1">Make private </label>
                          <button
                            className="ml-2 text-xl border-0 rounded-full w-6 h-6 flex items-center justify-center bg-red-500 text-white"
                            disabled
                          >
                            P
                          </button>
                        </div>
                        <div className="flex items-center ml-5">
                          <select
                            value={categoryId}
                            className="bg-white border-black"
                            onChange={handleCategory}
                          >
                            <option value="" disabled>
                              Choose your category
                            </option>
                            {categories.map((cat) => (
                              <option
                                key={cat.categoryId}
                                value={cat.categoryId}
                              >
                                {cat.cName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-row md:flex-row items-center md:space-x-4 space-x-2 mt-4 md:mt-0">
                        <button
                          className="text-xs bg-blue-600 hover:bg-blue-900 text-white border-0 rounded w-28 h-9 px-2 cursor-pointer"
                          onClick={handlePreview}
                        >
                          Preview
                        </button>
                        <button
                          className="text-xs bg-red-600 hover:bg-red-900 text-white border-0 rounded w-28 h-9 px-2 cursor-pointer"
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                        <button
                          className="text-xs bg-green-600 hover:bg-green-900 text-white border-0 rounded w-28 h-9 px-2 cursor-pointer"
                          type="submit"
                        >
                          Save changes
                        </button>
                      </div>
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
