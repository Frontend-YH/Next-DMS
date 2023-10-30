"use client"
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import QEditor from '@/components/QEditor';
import './page.css';

export default function editPost() {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [post, setPost] = useState({})
    const [preview, setPreview] = useState(false)

    const router = useRouter();

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
            }

        }
        if (postId) getPost();


    }, [postId])



    const titleEventHandler = ((event) => {
        setTitle(event.target.value);
    }) 

    const contentEventHandler = ((event) => {
        setContent(event);
    }) 

    const handlePreview = ((event) => {
        event.preventDefault();
        setPreview(!preview)
    }) 

    const handleSubmit = async (event) =>  {

         event.preventDefault();

         

         const res = await fetch("/api/posts/" + postId, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({title, content})
         })

         

         if (res.ok) {
            
            router.push("/");
         } 

         
        }

        // Document Edit Container Styling
        const documentEdit = {
          backgroundColor: "#ffffff",
          padding: "0px",
          margin: "0px",
        }     
        
        // Document Edit Input
        const documentEditInput = {
            display: "block",
            width: "350px",
            height: "38px",
            fontFamily: "sans-serif, arial, verdana",
            fontSize: "12px",
            padding: "20px",
            border: "1px solid #aaaaaa",
            borderRadius: "6px",
            marginBottom: "10px",
            backgroundColor: "#ffffff",
            color: "#000000"
          }    

        // Document Edit TextArea
        const documentEditTA = {
            display: "block",
            width: "350px",
            height: "406px",
            fontFamily: "sans-serif, arial, verdana",
            fontSize: "12px",
            padding: "20px",
            border: "1px solid #aaaaaa",
            borderRadius: "6px",
            backgroundColor: "#ffffff",
            color: "#000000"
          }

        // Document Preview Content
        const documentPreviewContent= {
            display: "block",
            width: "350px",
            height: "406px",
            fontFamily: "sans-serif, arial, verdana",
            fontSize: "12px",
            padding: "30px",
            border: "1px solid #aaaaaa",
            borderRadius: "6px",
            backgroundColor: "#ffffff",
            color: "#000000",
            textAlign: "left"
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

     // Document Label Styling
     const documentLabel = {
        display: "block",
        fontFamily: "sans-serif, arial, verdana",
        fontSize: "20px",
        textAlign: "center",
        color: "#000000"
    }   

   // Document Preview Title Styling
   const documentPreviewTitle = {
    display: "block",
    fontFamily: "sans-serif, arial, verdana",
    fontSize: "20px",
    textAlign: "center",
    color: "#000000",
    textAlign: "center"
}  

const documentPreviewBtn = {

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

    const documentPreviewBtnClose = {

        fontSize: "12px",
        backgroundColor: "#777777",
        color: "#ffffff",
        border: "0px",
        borderRadius: "6px",
        width: "120px",
        height: "36px",
        padding: "10px",
        cursor: "pointer"
    
        } 

  const documentSaveBtn = {

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

  const btnDiv = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  }  

    return (
        <div style={documentEdit}>
            {post ? (
            <div>
            <form onSubmit={handleSubmit}>
            <ul style={documentUl}>
            <li style={documentLi}>

            {preview ? (

            <div>
                <label style={documentPreviewTitle}>{title}</label><br/>
                <div style={documentPreviewContent} dangerouslySetInnerHTML={{ __html: content }} className="html-content"/><br/>
                <div style={btnDiv}>
                <button style={documentPreviewBtnClose} onClick={handlePreview}>Close Preview</button>
                </div>
            </div>

      ) : (

        <div>

            <label style={documentLabel}>Document Title</label>
            <input style={documentEditInput} type="text" defaultValue={title || post.title} onChange={titleEventHandler}/> 
            <label style={documentLabel}>Text Content</label>
            
            <QEditor onChange={contentEventHandler} value={content || post.content}/>

            <div style={btnDiv}>
                <button style={documentPreviewBtn} onClick={handlePreview}>Preview document</button>
                <button  style={documentSaveBtn} type="submit">Save changes</button>
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
    )

}