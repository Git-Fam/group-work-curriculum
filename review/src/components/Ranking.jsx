import React, { useEffect, useMemo, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  runTransaction,
  Timestamp,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import "./Ranking.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faComment, faThumbsUp } from "@fortawesome/free-regular-svg-icons";

const Ranking = () => {
  const [activeTab, setActiveTab] = useState("want");
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [activeModalPost, setActiveModalPost] = useState(null);
  const [commentInput, setCommentInput] = useState("");

  const auth = getAuth();

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => setUser(u || null));
    const q = collection(db, "posts");
    const unsubPosts = onSnapshot(q, (snap) => {
      const postData = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setPosts(postData);
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

  // 並び替え
  const sortedPosts = useMemo(() => {
    const list = [...posts];
    if (activeTab === "want") {
      return list.sort((a, b) => (b.wants || 0) - (a.wants || 0));
    } else {
      return list.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }
  }, [activeTab, posts]);

  return (
    <div className="ranking-page">
      {/* タブ */}
      <div className="rank-tabs" role="tablist" aria-label="ranking tabs">
        <button
          role="tab"
          aria-selected={activeTab === "want"}
          className={`tab ${activeTab === "want" ? "active" : ""}`}
          onClick={() => setActiveTab("want")}
        >
          行ってみたいランキング
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "like"}
          className={`tab ${activeTab === "like" ? "active" : ""}`}
          onClick={() => setActiveTab("like")}
        >
          いいね数ランキング
        </button>
      </div>

      <div className="rank-list">
        {sortedPosts.map((p) => {
          const liked =
            user && Array.isArray(p.likesBy)
              ? p.likesBy.includes(user.uid)
              : false;
          const wanted =
            user && Array.isArray(p.wantsBy)
              ? p.wantsBy.includes(user.uid)
              : false;
          const hasRepeatTag = p.tags?.includes("また泊まりたい");
          const sortedComments = (p.comments || [])
            .slice()
            .sort(
              (a, b) =>
                (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
            );

          return (
            <div
              key={p.id}
              className={`post-with-comments review-card ${
                hasRepeatTag ? "highlight-repeat" : ""
              }`}
            >
              <div className="review-top">
                <div className="review-left">
                  {hasRepeatTag && (
                    <div className="repeat-banner">
                      ★ また泊まりたいと評価されました！
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
                        <span className="tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {!!p.title && <h3 className="review-title">{p.title}</h3>}
                  {!!p.content && (
                    <p className="review-content">{p.content}</p>
                  )}
                </div>

                {p.imageUrl && (
                  <div className="review-right">
                    <img src={p.imageUrl} alt={p.name} />
                  </div>
                )}
              </div>

              <div className="review-bottom">
                <div className="review-actions">
                  <button
                    className={`action-btn ${liked ? "active" : ""}`}
                    onClick={() => toggleLike(p.id)}
                  >
                    <FontAwesomeIcon icon={faThumbsUp} /> いいね (
                    {p.likes || 0})
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
                    <FontAwesomeIcon icon={faBookmark} /> 行ってみたい (
                    {p.wants || 0})
                  </button>
                </div>

                <div className="review-footer">
                  <span className="author">{p.author || "匿名"}</span>
                  {p.createdAt?.toDate && (
                    <span className="date">
                      {p.createdAt.toDate().toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="review-comments">
                {sortedComments.map((c, idx) => (
                  <div key={idx} className="comment-card">
                    <div className="comment-box">
                      <div className="comment-text">{c.text}</div>
                      <div className="comment-footer">
                        <strong>{c.name}</strong>{" "}
                        <span className="comment-date">
                          {c.createdAt?.toDate
                            ? c.createdAt
                                .toDate()
                                .toLocaleDateString()
                            : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

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
                      <button onClick={() => setActiveModalPost(null)}>
                        キャンセル
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {sortedPosts.length === 0 && (
          <p className="empty">まだ投稿がありません。</p>
        )}
      </div>
    </div>
  );
};

export default Ranking;
