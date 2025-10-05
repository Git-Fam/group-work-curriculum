import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  Timestamp,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import "./Home.css";
import headerimg from "../images/homeheader.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTag } from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faComment, faThumbsUp } from "@fortawesome/free-regular-svg-icons";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [activeModalPost, setActiveModalPost] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);

  const auth = getAuth();

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => setUser(u || null));
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubPosts = onSnapshot(q, (snap) => {
      const postData = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setPosts(postData);
      setFilteredPosts(postData);

      const tagsSet = new Set();
      postData.forEach((p) => p.tags?.forEach((t) => tagsSet.add(t)));
      setAllTags(Array.from(tagsSet));
    });

    return () => {
      unsubAuth();
      unsubPosts();
    };
  }, [auth]);

  const toggleLike = async (postId) => {
    if (!user) return alert("ログインしてください。");
    const postRef = doc(db, "posts", postId);
    try {
      await runTransaction(db, async (tx) => {
        const snap = await tx.get(postRef);
        if (!snap.exists()) throw new Error("投稿が見つかりません");
        const data = snap.data();
        const likesBy = Array.isArray(data.likesBy) ? data.likesBy : [];
        if (!likesBy.includes(user.uid)) {
          tx.update(postRef, {
            likesBy: [...likesBy, user.uid],
            likes: (data.likes || 0) + 1,
          });
        }
      });
    } catch (err) {
      console.error("toggleLike error:", err);
    }
  };

  const toggleWant = async (postId) => {
    if (!user) return alert("ログインしてください。");
    const postRef = doc(db, "posts", postId);
    try {
      await runTransaction(db, async (tx) => {
        const snap = await tx.get(postRef);
        if (!snap.exists()) throw new Error("投稿が見つかりません");
        const data = snap.data();
        const wantsBy = Array.isArray(data.wantsBy) ? data.wantsBy : [];
        if (!wantsBy.includes(user.uid)) {
          tx.update(postRef, {
            wantsBy: [...wantsBy, user.uid],
            wants: (data.wants || 0) + 1,
          });
        }
      });
    } catch (err) {
      console.error("toggleWant error:", err);
    }
  };

  const submitComment = async (postId) => {
    if (!user) return alert("ログインしてください。");
    const text = commentInput.trim();
    if (!text) return;

    const postRef = doc(db, "posts", postId);
    try {
      await runTransaction(db, async (tx) => {
        const snap = await tx.get(postRef);
        if (!snap.exists()) throw new Error("投稿が見つかりません");
        const comments = Array.isArray(snap.data().comments)
          ? snap.data().comments
          : [];
        const newComment = {
          uid: user.uid,
          name: user.displayName || "名無し",
          text,
          createdAt: Timestamp.now(),
        };
        tx.update(postRef, { comments: [...comments, newComment] });
      });
      setCommentInput("");
      setActiveModalPost(null);
    } catch (err) {
      console.error("submitComment error:", err);
    }
  };

  const handleSearch = () => {
    let filtered = [...posts];
    if (keyword.trim() !== "") {
      const kw = keyword.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title?.toLowerCase().includes(kw) ||
          p.content?.toLowerCase().includes(kw) ||
          p.name?.toLowerCase().includes(kw)
      );
    }
    if (selectedTags.length > 0) {
      filtered = filtered.filter(
        (p) => p.tags && selectedTags.every((t) => p.tags.includes(t))
      );
    }
    setFilteredPosts(filtered);
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <>
      <div className="header-container">
        <img src={headerimg} alt="ヘッダー画像" className="header-img" />
      </div>

      <div className="search-container">
        <div className="keyword-search">
          <div className="input-wrapper">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
            <input
              type="text"
              placeholder="エリア・宿泊施設キーワード"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <button onClick={handleSearch}>検索する</button>
        </div>

        <div className="tag-checkboxes">
          <FontAwesomeIcon icon={faTag} className="tag-list-icon" />
          {allTags.map((tag) => (
            <label key={tag} className="tag-label">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => toggleTag(tag)}
              />
              {tag}
            </label>
          ))}
        </div>
      </div>

      <div className="review-list-container">
        {filteredPosts.map((p) => {
          const liked =
            user && Array.isArray(p.likesBy) ? p.likesBy.includes(user.uid) : false;
          const wanted =
            user && Array.isArray(p.wantsBy) ? p.wantsBy.includes(user.uid) : false;

          const isRepeat = p.tags?.includes("また泊まりたい");
          const sortedComments = (p.comments || []).slice().sort(
            (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
          );

          return (
            <div key={p.id} className="post-with-comments">
              <div className={`review-card ${isRepeat ? "repeat" : ""}`}>
                <div className="review-left">
                  {isRepeat && (
                    <div className="review-repeat-text">
                      ★また泊まりたいと評価されました！
                    </div>
                  )}

                  <div className="review-header">
                    <h2 className="review-name">{p.name}</h2>
                    <p className="review-address">{p.address}</p>
                  </div>

<div className="review-meta">
  <span className="stars">
    {Array.from({ length: 5 }).map((_, idx) => {
      const rating = Number(p.rating) || 0;
      if (idx + 1 <= Math.floor(rating)) {
        return <span key={idx} className="star full">★</span>;
      } else if (idx < rating) {
        return <span key={idx} className="star half">★</span>;
      } else {
        return <span key={idx} className="star empty">★</span>;
      }
    })}
  </span>
  一泊値段帯：
  {!!p.price && <span className="price">{p.price}</span>}
</div>

                  {p.tags?.length > 0 && (
                    <div className="review-tags">
                      {p.tags.map((t) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                  )}

                  {p.title && <h3 className="review-title">{p.title}</h3>}
                  {p.content && <p className="review-content">{p.content}</p>}

                                  {p.imageUrl && (
                  <div className="review-right">
                    <img src={p.imageUrl} alt={p.name} />
                  </div>
                )}

                  <div className="review-bottom">
                    <div className="review-actions">
                      <button
                        className={`action-btn ${liked ? "active" : ""}`}
                        onClick={() => toggleLike(p.id)}
                      >
                        <FontAwesomeIcon icon={faThumbsUp} /> いいね ({p.likes || 0})
                      </button>

                      <button
                        className="action-btn"
                        onClick={() => setActiveModalPost(p.id)}
                      >
                        <FontAwesomeIcon icon={faComment} /> コメント
                      </button>

                      <button
                        className={`action-btn ${wanted ? "active" : ""}`}
                        onClick={() => toggleWant(p.id)}
                      >
                        <FontAwesomeIcon icon={faBookmark} /> 行ってみたい ({p.wants || 0})
                      </button>
                    </div>

                    <div className="review-footer">
                      <span className="author">{p.author}</span>
                      {p.createdAt?.toDate && (
                        <span className="date">{p.createdAt.toDate().toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </div>


              </div>

              {sortedComments.map((c, idx) => (
                <div key={idx} className="comment-card">
                  <div className="comment-box">
                    <div className="comment-text">{c.text}</div>
                    <div className="comment-footer">
                      <strong>{c.name}</strong>{" "}
                      <span className="comment-date">
                        {c.createdAt?.toDate?.()
                          ? c.createdAt.toDate().toLocaleDateString()
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
                
              ))}

              {activeModalPost === p.id && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <h3>コメントを入力</h3>
                    <textarea
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      placeholder="コメントを入力..."
                    />
                    <div className="modal-actions">
                      <button onClick={() => submitComment(p.id)}>送信</button>
                      <button onClick={() => setActiveModalPost(null)}>キャンセル</button>
                    </div>
                  </div>
                </div>
              )}
              
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
