"use client"
import { useEffect, useState } from "react";

export default function Search(props) {
 
  const [posts, setPosts] = useState([]);
  const [tempPosts, setTempPosts] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await fetch("/api/posts");
      const posts = await res.json();

      setPosts(posts);
      setTempPosts(posts);
    };
    getPost();
  }, []);

    let searchResults = [];
    const searchFieldChange = (e) => {

    if (isChecked) {

        if (e.target.value.length>2) {
          searchResults = posts.filter(post=>{
            return post.title.toLowerCase().includes(e.target.value.toLowerCase()) || post.content.toLowerCase().includes(e.target.value.toLowerCase());
          })
        } else {
            searchResults = posts.filter(post=>{
            return post.title.toLowerCase().substring(0, 2).includes(e.target.value.toLowerCase()) || post.content.toLowerCase().includes(e.target.value.toLowerCase());
        })
        }

    } else {

        if (e.target.value.length>2) {
          searchResults = posts.filter(post=>{
            return post.title.toLowerCase().includes(e.target.value.toLowerCase());
          })
        } else {
            searchResults = posts.filter(post=>{
            return post.title.toLowerCase().substring(0, 2).includes(e.target.value.toLowerCase());
        })
        }

    }

          props.setPosts(searchResults);
        
        };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSearchFocus = (e) => {
    // Automatically switch to ALL CATEGORIES when searching
    
    props.setExpandedCategory("View all");
    props.setPosts(posts);
  };

  //(e) => props.setExpandedCategory("View all")

  return (
    <div className="flex bg-white text-black">
      <div>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search" className="rounded p-1 text-md w-38 border" onFocus={handleSearchFocus} onChange={searchFieldChange}/>
      <label htmlFor="search" className="m-2">Include body: </label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="mr-2 text-center rounded-l m-2"
        />
      </div>
    </div>
  );
}
