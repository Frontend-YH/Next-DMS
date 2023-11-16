"use client";
import { useEffect, useState } from "react";
import Main from "@/components/Main";
import Search from "@/components/Search";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import DocumentButtons from "@/components/DocumentButtons";
import React, { useMemo } from "react";

function Dms() {
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [expandedCategory, setExpandedCategory] = useState("View all");
  const groupedCategory = useMemo(() => groupByCategory(posts), [posts]);
  const [userId, setUserId] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(localStorage.getItem("userId"));
      setLoggedIn(localStorage.getItem("user"));
    }
  }, []);

  useEffect(() => {
    const getPost = async () => {
      const res = await fetch("/api/posts");
      const posts = await res.json();

      setPosts(posts);
    };
    getPost();
  }, [isDeleted]);

  useEffect(() => {
    const getFavorites = async () => {
      const res = await fetch("/api/getfavorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const allFavorites = await res.json();

      const userFavorites = allFavorites.filter(
        (fav) => String(fav.authorId) === String(userId)
      );

      const favoritesMap = {};
      userFavorites.forEach((fav) => {
        favoritesMap[fav.postId] = true;
      });

      setFavorites(favoritesMap);
    };

    if (userId) {
      getFavorites();
    }
  }, [userId]);

  const handleShow = (postId) => {
    router.push("/show-post/?pid=" + postId);
  };

  const handleEdit = (postId) => {
    router.push("/edit-post/?pid=" + postId);
  };

  // FOR DELETE
  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const res = await fetch("/api/posts/" + postId, {
        method: "DELETE",
      });

      if (res.ok) {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.pid !== postId)
        );
        setIsDeleted(true);
      }
    }
  };
  //Sort by category

  function groupByCategory(posts) {
    return posts.reduce((acc, post) => {
      const { cName: category } = post;
      acc[category] = acc[category] || [];
      acc[category].push(post);
      return acc;
    }, {});
  }

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

  const favClickHandler = async (e) => {
    const postId = parseInt(e.target.name);
    const authorId = parseInt(userId);

    const res = await fetch("/api/favorites/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, authorId }),
    });

    if (res.ok) {
      res.json().then((data) => {
        setFavorites((prevFavorites) => ({
          ...prevFavorites,
          [postId]: data.favorite,
        }));
      });
    }
  };

  // Show the latest edited/created document at the top
  const reversedDocs = posts.slice().reverse();

  // Default 0 border on posts
  reversedDocs.map((post) => {
    post.border = "border-0";
  });

  // #######################################################################################
  // ########### Filter POSTS based on logged in user ######################################
  let docs = [];

  //const loggedIn = localStorage.getItem("user");

  if (loggedIn === null) {
    docs = reversedDocs.filter((post) => {
      // Only show posts that is set as public = 2
      // 0 = private (login required)
      // 1 = public but only for logged in users
      // 2 = completely public (no login required)
      return post.isPublic === 2;
    });
  } else {
    docs = reversedDocs.filter((post) => {
      // Only show posts that is set as private but belongs to the user AND public posts
      return (
        (post.isPublic === 0 && post.userName === loggedIn) ||
        post.isPublic === 1
      );
    });

    /*     docs.map((post) => {
      if (post.userName === loggedIn) {
        post.border = "border-2 border-green-500";
      }
      if (post.userName === loggedIn && post.isPublic === 0) {
        post.border = "border-2 border-red-500";
      }
    }); */
  }

  docs.sort((a, b) => {
    const aIsFavorite = favorites[a.pid];
    const bIsFavorite = favorites[b.pid];

    if (aIsFavorite && !bIsFavorite) {
      return -1;
    } else if (!aIsFavorite && bIsFavorite) {
      return 1;
    } else {
      return 0;
    }
  });

  const filteredDocs = useMemo(() => {
    if (expandedCategory === "View all" || !groupedCategory[expandedCategory]) {
      return docs;
    }

    return groupedCategory[expandedCategory];
  }, [expandedCategory, groupedCategory, docs]);
  // ##########################################################################################

  return (
    <Main>
      <div
        className="bg-white p-0 m-0"
        style={{ width: "100vw", textAlign: "center" }}
      >
        {posts ? (
          <div>
            <div className="flex flex-col md:flex-row justify-center items-center mt-0 space-y-2 md:space-y-0 md:space-x-10">
              {loggedIn && (
                <>
                  <Search
                    setExpandedCategory={setExpandedCategory}
                    posts={posts}
                    setPosts={setPosts}
                  />
                  <div className="flex flex-col md:flex-row flex-wrap items-center justify-between md:space-x-10">
                    <div className="flex flex-row items-center space-x-2">
                      <label className="w-32 text-black font-semibold">
                        Category:
                      </label>
                      <select
                        className="md:ml-5 ml-0"
                        onChange={(e) => setExpandedCategory(e.target.value)}
                        value={expandedCategory}
                      >
                        <option key="" value="View all">
                          View all
                        </option>
                        {Object.keys(groupedCategory).map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <DocumentButtons />
                    </div>
                  </div>
                </>
              )}
            </div>

            <ul className="flex flex-wrap justify-center list-none md:mt-10 mt-5 transition-all ease-in duration-300">
              {loggedIn ? (
                filteredDocs.length > 0 ? (
                  filteredDocs.map((post) => (
                    <li
                      key={post.pid}
                      className={`${post.border} border-gray-200 border-2 relative flex flex-col justify-between w-2/5 md:w-56 h-auto my-2 p-3 rounded bg-white shadow-sm m-2`}
                    >
                      <button
                        className={`absolute top-0 left-0 m-2 text-xl border-0 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer ${
                          favorites[post.pid]
                            ? "bg-yellow-600 hover:bg-gray-500"
                            : "bg-gray-500 hover:bg-yellow-600"
                        }`}
                        name={post.pid}
                        onClick={favClickHandler}
                      >
                        ★
                      </button>
                      {post.userName === loggedIn && (
                        <>
                          <button
                            className="absolute top-0 right-0 m-2 text-xs bg-gray-600 hover:bg-gray-900 text-white border-0 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                            name={post.pid}
                            onClick={deleteClickHandler}
                          >
                            X
                          </button>
                          {post.isPublic === 0 && (
                            <button
                              className="absolute top-0 left-8 m-2 text-xl border-0 rounded-full w-6 h-6 flex items-center justify-center bg-red-500 text-white"
                              disabled
                            >
                              P
                            </button>
                          )}
                        </>
                      )}
                      <div className="h-48 mb-4 text-left">
                        <h2 className="font-sans text-md text-black font-semibold mt-8 truncate">
                          {post.title}
                        </h2>
                        <p
                          className="text-xs text-gray-700 overflow-hidden h-36"
                          dangerouslySetInnerHTML={{
                            __html: post.content,
                          }}
                        ></p>
                      </div>
                      <div className="mb-4 text-left">
                        <span className="text-xs font-medium text-gray-600">
                          {post.authorName}
                        </span>
                        <span className="text-xs font-medium text-gray-600">
                          - {formatTimestamp(post.lastUpdated)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <button
                          className="text-xs bg-blue-600 hover:bg-blue-900 text-white border-0 rounded md:w-20 w-14 h-8 px-2 cursor-pointer"
                          name={post.pid}
                          onClick={showClickHandler}
                        >
                          Open
                        </button>
                        {post.userName === loggedIn && (
                          <button
                            className="text-xs bg-green-600 hover:bg-green-900 text-white border-0 rounded md:w-20 w-14 h-8 px-2 cursor-pointer"
                            name={post.pid}
                            onClick={editClickHandler}
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-center text-xl">
                    No posts available for this category.
                  </p>
                )
              ) : null}
            </ul>
          </div>
        ) : (
          <div className="text-center text-xl">Loading...</div>
        )}
      </div>
    </Main>
  );
}

export default Dms;
