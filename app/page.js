"use client";
import { useEffect, useState } from "react";
import Main from "@/components/Main";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import DocumentButtons from "@/components/DocumentButtons";

function Dms() {
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [expandedCategory, setExpandedCategory] = useState("View all");

  const router = useRouter();

  useEffect(() => {
    const getPost = async () => {
      const res = await fetch("/api/posts");
      const posts = await res.json();

      setPosts(posts);
    };
    getPost();
  }, []);

  useEffect(() => {
    const getFavorites = async () => {
      const res = await fetch("/api/favorites");
      const favorites = await res.json();

      const favoritesMap = {};
      favorites.forEach((fav) => {
        favoritesMap[fav.postId] = true;
      });

      setFavorites(favoritesMap);
    };

    getFavorites();
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
  //Sort by category

  function groupByCategory(posts) {
    const groupedCategory = {};
    posts.forEach((post) => {
      const category = post.cName;
      if (!groupedCategory[category]) {
        groupedCategory[category] = [];
      }
      groupedCategory[category].push(post);
    });
    return groupedCategory;
  }
  const groupedCategory = groupByCategory(posts);

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
      setFavorites((prevFavorites) => ({
        ...prevFavorites,
        [postId]: !prevFavorites[postId],
      }));
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
  const loggedIn =
    typeof localStorage !== "undefined" ? localStorage.getItem("user") : null;

  //const userId = localStorage.getItem("userId");
  const userId =
    typeof localStorage !== "undefined" ? localStorage.getItem("userId") : null;

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
  // ##########################################################################################

  return (
    <Main>
      <div
        className="bg-white p-0 m-0"
        style={{ width: "100vw", textAlign: "center" }}
      >
        {posts ? (
          <div>
            {loggedIn && (
              <div className="flex justify-between items-center md:mr-32 mr-2 md:ml-32 ml-2 mt-5">
                <div>
                  <label className="w-32 text-black font-semibold ">
                    Sort by category:
                  </label>
                  <select
                    className="md:ml-5"
                    onChange={(e) => setExpandedCategory(e.target.value)}
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
                {loggedIn && <DocumentButtons />}
              </div>
            )}

            {expandedCategory === "View all" ? (
              <ul className="flex flex-wrap justify-center list-none m-10 transition-all ease-in duration-300">
                {docs.map((post) => (
                  <li
                    key={post.pid}
                    className={`${post.border} border-gray-200 border-2 relative flex flex-col justify-between w-56 h-auto my-2 p-3 rounded bg-white shadow-sm m-2`}
                  >
                    {post.userName === loggedIn && (
                      <button
                        className={`absolute top-0 left-0 m-2 text-xl border-0 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer 
    ${
      favorites[post.pid]
        ? "bg-yellow-600 hover:bg-gray-500"
        : "bg-gray-500 hover:bg-yellow-600"
    }`}
                        name={post.pid}
                        onClick={favClickHandler}
                      >
                        ★
                      </button>
                    )}
                    {post.userName === loggedIn && post.isPublic === 0 && (
                      <button
                        className="absolute top-0 left-8 m-2 text-xl border-0 rounded-full w-6 h-6 flex items-center justify-center bg-red-500 text-white"
                        disabled
                      >
                        P
                      </button>
                    )}
                    {post.userName === loggedIn && (
                      <button
                        className="absolute top-0 right-0 m-2 text-xs bg-gray-600 hover:bg-gray-900 text-white border-0 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                        name={post.pid}
                        onClick={deleteClickHandler}
                      >
                        X
                      </button>
                    )}
                    <div className="overflow-hidden h-40 mb-4 text-left">
                      <h2 className="font-sans text-md text-black font-semibold mt-8 truncate">
                        {post.title}
                      </h2>
                      <p
                        className="text-xs text-gray-700 truncate"
                        dangerouslySetInnerHTML={{
                          __html:
                            post.content.length > 200
                              ? post.content.substring(0, 200) + "..."
                              : post.content,
                        }}
                      ></p>
                    </div>
                    <div className="mb-4 text-left">
                      <span className="text-xs font-medium text-gray-600">
                        {post.authorName}
                      </span>
                      <span className="text-xs font-medium text-gray-600">
                        {" "}
                        - {formatTimestamp(post.lastUpdated)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <button
                        className="text-xs bg-blue-600 hover:bg-blue-900 text-white border-0 rounded-md w-20 h-8 px-2 cursor-pointer"
                        name={post.pid}
                        onClick={showClickHandler}
                      >
                        Open
                      </button>
                      {post.userName === loggedIn && (
                        <div className="flex space-x-2">
                          <button
                            className="text-xs bg-green-600 hover:bg-green-900 text-white border-0 rounded-md w-20 h-8 px-2 cursor-pointer"
                            name={post.pid}
                            onClick={editClickHandler}
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                {Object.keys(groupedCategory).map((category) => (
                  <div
                    key={category}
                    className={`${
                      expandedCategory === category
                        ? "relative z-10"
                        : "absolute z-0"
                    }`}
                  >
                    <ul className="flex flex-wrap justify-center list-none m-10 transition-all ease-in duration-300">
                      {groupedCategory[category]
                        .filter((post) => {
                          console.log("Expanded Category:", expandedCategory);
                          return (
                            expandedCategory === "" ||
                            expandedCategory === "View all" ||
                            post.cName === expandedCategory
                          );
                        })
                        .map((post) => (
                          <li
                            key={post.pid}
                            className={`${post.border} flex flex-col justify-between w-64 h-60 my-2 p-5 rounded-md bg-blue-100 shadow m-5`}
                          >
                            <div className="overflow-y-hidden">
                              <p className="block pb-3 font-sans text-xl text-black">
                                {post.authorName}
                              </p>
                              <span className="block pb-3 font-sans text-xl text-black">
                                {post.title.length > 20
                                  ? post.title.substring(0, 20) + "..."
                                  : post.title}
                                <p className="text-sm my-1 font-semibold">
                                  {formatTimestamp(post.lastUpdated)}
                                </p>
                                <p
                                  className="text-xs"
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      post.content.length > 200
                                        ? post.content.substring(0, 200) + "..."
                                        : post.content,
                                  }}
                                />
                              </span>
                            </div>
                            {post.userName === loggedIn ? (
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
                                <button
                                  className={`text-xs border-0 rounded-md w-28 h-9 px-2 cursor-pointer ${
                                    favorites[post.pid]
                                      ? "bg-yellow-700 text-white"
                                      : "bg-yellow-200 text-black"
                                  }`}
                                  name={post.pid}
                                  onClick={favClickHandler}
                                >
                                  Favorite
                                </button>
                              </div>
                            ) : (
                              <div className="flex flex-row justify-around w-full space-x-4">
                                <button
                                  className="text-xs bg-blue-600 text-white border-0 rounded-md w-28 h-9 px-2 cursor-pointer"
                                  name={post.pid}
                                  onClick={showClickHandler}
                                >
                                  Open
                                </button>
                              </div>
                            )}
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>Loading..</div>
        )}
      </div>
    </Main>
  );
}

export default Dms;
