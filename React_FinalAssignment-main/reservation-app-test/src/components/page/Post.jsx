import "./Post.css";
import React, { useState } from "react";
import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {auth, db} from "../../firebase";



const Post = () => {

    const [title, setTitle] = useState();
    const [text, setText] = useState();
    const db = getFirestore();
    const auth = getAuth();

    const createPost = async() =>{
        const data = await getDocs(collection(db, "user"));
        await addDoc(collection(db, "posts"),{
            title: title,
            text: text,

        
        });
        alert("送信しました！");
    }

  return (
    <>
    <div className='postForm'>
        <div className='postTitleGroup'>
            <div className="postFormTitle">件名</div>
            <input onChange={(e) => setTitle(e.target.value)} className='postTitle' type='text' placeholder='件名を入力'></input>
        </div>
        <div className='postTextGroup'>
            <div className="postFormTitle">問い合わせ内容</div>
            <textarea onChange={(e) => setText(e.target.value)} className='postText' placeholder='問い合わせ内容を入力'></textarea>
        </div>
        <button className="postSend" onClick={createPost}>送信</button>
    </div>
    
    </>

  )
}

export default Post;