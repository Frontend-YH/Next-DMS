"use client"
import { useEffect, useState } from "react";

export default function Search(props) {
 
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      const res = await fetch("/api/posts");
      const posts = await res.json();

      setPosts(posts);
    };
    getPost();
  }, []);

    let searchResults = [];
    const searchFieldChange = (e) => {

    if (e.target.value.length>2) {
      searchResults = posts.filter(post=>{
         return post.title.toLowerCase().includes(e.target.value.toLowerCase());
      })
    } else {
        searchResults = posts.filter(post=>{
        return post.title.toLowerCase().substring(0, 2).includes(e.target.value.toLowerCase());
     })
     }

      props.setPosts(searchResults);
    
    };


  return (
    <div className="max-w-lg p-0 m-0 relative flex justify-center border-t border-gray-500 p-5 bg-white mt-5 text-lg w-full mb-0 border-b-0 text-black">
      <div>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search" className="rounded p-1 text-md w-38 m-0 mt-10 border" onChange={searchFieldChange}/>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}
