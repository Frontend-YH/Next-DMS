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
    <div className="flex bg-white text-black">
      <div>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search" className="rounded p-1 text-md w-38 border" onChange={searchFieldChange}/>
      </div>
    </div>
  );
}
