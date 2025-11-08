import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc
} from "firebase/firestore";
import "./PostList.css";

const PostList = () => {

    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [postsWithUserNames, setPostsWithUserNames] = useState(
        []
    );
    const db = getFirestore();


    useEffect(() => {
        const fetchPosts = async () => {
        try {
            const postsCollection = collection(db, "posts");
            const postsSnapshot = await getDocs(postsCollection);
            const postsList = postsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));

            setPosts(postsList);
        } catch (error) {
            console.error("Error fetching posts:", error.message);
        }
        };

        fetchPosts();
    }, [db]);


    useEffect(() => {
    const fetchUsers = async () => {
        try {
        const usersCollection = collection(db, "users");
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map((doc) => ({
            uid: doc.id,
            ...doc.data(),
        }));

        setUsers(userList);
        } catch (error) {
        console.error("Error fetching users:", error.message);
        }
    };

    fetchUsers();
    }, [db]);


    useEffect(() => {
    const addUserNamesToPosts = () => {
        const updatedPosts = posts.map((posts) => {
        const user = users.find((user) => user.uid === posts.userId);
        return {
            ...posts,
            userName: user ? user.name : "不明",
            email: user.email,
        };
        });

        setPostsWithUserNames(updatedPosts);
        setLoading(false);
    };

    if (posts.length > 0 && users.length > 0) {
        addUserNamesToPosts();
    }
    }, [posts, users]);

    if (loading) {
    return <p>Loading...</p>;
    }

    if (postsWithUserNames.length === 0) {
    return <p>No post found.</p>;
    }



  return (
    <div>
        <h2>問い合わせ一覧</h2>
        {postsWithUserNames.map((posts) => (
            <div key={posts.id} className="post-card">
                <p>{posts.userName}</p>
                <p>{posts.email}</p>
                <p>【件名】{posts.title}</p>
                <p>【問い合わせ内容】<br />
                    {posts.text}</p>
            </div>
        ))}
    </div>
  )
}

export default PostList;