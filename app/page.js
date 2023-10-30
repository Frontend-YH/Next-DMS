"use client"
import { useEffect, useState } from 'react';
import Main from '@/components/Main';
import { useRouter } from 'next/navigation'; 
import { format } from 'date-fns';


function Dms() {

  const [posts, setPosts] = useState([]);

  const router = useRouter(); 

  useEffect(() => { 
    const getPost = async () => {
      const res = await fetch("/api/posts");
      const posts = await res.json();
   
      setPosts(posts);
    }
    getPost();  
  }, [])

  const handleShow = (postId) => {
    router.push("/show-post/?pid=" + postId);
  }
  
    const handleEdit = (postId) => {
      router.push("/edit-post/?pid=" + postId);
    }

        // FOR DELETE
        const handleDelete = async (postId) => {
          const res = await fetch("/api/posts/" + postId, {
             method: "DELETE"
          });

          if (res.ok) {
            window.location.reload();          
         } 

        }

    // FOR SHOW
    const showClickHandler = ((e) => {
      handleShow(e.target.name);
    }) 

    // FOR EDIT
    const editClickHandler = ((e) => {
      
      handleEdit(e.target.name);
    }) 

        // FOR DELETE
        const deleteClickHandler = ((e) => {
          handleDelete(e.target.name);
        }) 

  // Document List Styling
  const documentList = {
    backgroundColor: "#ffffff",
    padding: "0px",
    margin: "0px",
  }

    // Document Ul Styling
    const documentUl = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      listStyle: "none"
    
    }

    // Document Li Styling
    const documentLi = {
        width: "100%",
        height: "fit-content",
        margin: "8px",
        padding: "20px",
        borderRadius: "6px",
        textAlign: "center",
        backgroundColor: "#cccccc",
        boxShadow: "rgba(0, 0, 0, 0.30) 1.95px 1.95px 2.6px"
        
      
    }

  // Document Title Styling
  const documentListTitle = {
    display: "block",
    paddingBottom: "14px",
    fontFamily: 'sans-serif, arial, verdana',
    fontSize: "20px",
    fontWeight: "bold",
    color: "#000000",
  }


    // Document Text Styling
    const documentListText = {
      display: "block",
      width: "380px",
      paddingBottom: "14px",
      paddingLeft: "24px",
      paddingRight: "24px",
      fontFamily: 'sans-serif, arial, verdana',
      fontWeight: 100,
      fontSize: "16px",
      color: "#666666"
    
  }


  const documentEditBtn = {

    fontSize: "12px",
    backgroundColor: "#779B29",
    color: "#ffffff",
    border: "0px",
    borderRadius: "6px",
    width: "120px",
    height: "36px",
    padding: "10px",
    cursor: "pointer"

  }

  const documentShowBtn = {

    fontSize: "12px",
    backgroundColor: "#6178C8",
    color: "#ffffff",
    border: "0px",
    borderRadius: "6px",
    width: "120px",
    height: "36px",
    padding: "10px",
    cursor: "pointer"

  }

  const documentDeleteBtn = {

    fontSize: "12px",
    backgroundColor: "#A83F30",
    color: "#ffffff",
    border: "0px",
    borderRadius: "6px",
    width: "120px",
    height: "36px",
    padding: "10px",
    cursor: "pointer"

  }

  const btnDiv = {

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",


  }

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const formattedDate = format(date, 'yyyy-MM-dd');
    return formattedDate;
  }

  // Show the latest edited/created document at the top
  const reversedDocs = posts.slice().reverse();

  return (  <Main>
            
            <div style={documentList}>
            {posts ? (
            <ul style={documentUl}>
            {reversedDocs.map((post)=>(
                <li key={post.pid} style={documentLi}>
                  <span style={documentListTitle}>{formatTimestamp(post.date)} - {post.title}</span>
                 <div style={btnDiv}><button style={documentEditBtn} name={post.pid} onClick={editClickHandler}>Edit</button><button style={documentShowBtn} name={post.pid} onClick={showClickHandler}>Open</button><button style={documentDeleteBtn} name={post.pid} onClick={deleteClickHandler}>Delete</button></div>
                 </li>
                  
            ))}
            </ul>
              ) : (
                  <div>Loading...</div>
              )}
            </div>
            </Main>
         
  )

}

export default Dms;