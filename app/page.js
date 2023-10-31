"use client";
import { useEffect, useState } from "react";
import Main from "@/components/Main";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

function Dms() {
  const [posts, setPosts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const getPost = async () => {
      const res = await fetch("/api/posts");
      const posts = await res.json();

      setPosts(posts);

      console.log(posts);

    };
    getPost();
  }, []);

  const handleShow = (postId) => {
    router.push("/show-post/?pid=" + postId);
  };

  const handleEdit = (postId) => {
    router.push("/edit-post/?pid=" + postId);
  };

  // FOR DELETE
  const handleDelete = async (postId) => {
    const res = await fetch("/api/posts/" + postId, {
      method: "DELETE",
    });

    if (res.ok) {
      window.location.reload();
    }
  };

  // FOR SHOW
  const showClickHandler = (e) => {
    handleShow(e.target.name);
  };

  // FOR EDIT
  const editClickHandler = (e) => {
    handleEdit(e.target.name);
  };

  // FOR DELETE
  const deleteClickHandler = (e) => {
    handleDelete(e.target.name);
  };

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const formattedDate = format(date, "yyyy-MM-dd");
    return formattedDate;
  }

  // Show the latest edited/created document at the top
  const reversedDocs = posts.slice().reverse();

  return (
    <Main>
      <div className="bg-white p-0 m-0">
        {posts ? (
          <ul className="flex flex-wrap items-center list-none m-10">
            {reversedDocs.map((post) => (
              <li
                key={post.pid}
                className="flex flex-col justify-between w-64 h-60 my-2 p-5 rounded-md bg-blue-100 shadow m-5"
              >
                <div>
                  <span className="block pb-3 font-sans text-xl text-black">
                    {post.title.length > 20
                      ? post.title.substring(0, 20) + "..."
                      : post.title}
                    <p className="text-sm my-1 font-semibold">
                      {formatTimestamp(post.lastUpdated)}
                    </p>
                    <p
                      className="text-sm"
                      dangerouslySetInnerHTML={{
                        __html:
                          post.content.length > 100
                            ? post.content.substring(0, 100) + "..."
                            : post.content,
                      }}
                    />
                  </span>
                </div>
                <div className="flex flex-row justify-around w-full space-x-4">
                  <button
                    className="text-xs bg-green-600 text-white border-0 rounded-md w-28 h-9 px-2 cursor-pointer"
                    name={post.pid}
                    onClick={editClickHandler}
                  >
                    Edit
                  </button>
                  <button
                    className="text-xs bg-blue-600 text-white border-0 rounded-md w-28 h-9 px-2 cursor-pointer"
                    name={post.pid}
                    onClick={showClickHandler}
                  >
                    Open
                  </button>
                  <button
                    className="text-xs bg-red-600 text-white border-0 rounded-md w-28 h-9 px-2 cursor-pointer"
                    name={post.pid}
                    onClick={deleteClickHandler}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </Main>
  );
}

export default Dms;
