import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
  runTransaction,
  Timestamp,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { db } from "../firebase";
import "./Mypage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faComment, faThumbsUp } from "@fortawesome/free-regular-svg-icons";

const Mypage = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("ユーザー名");
  const [isEditing, setIsEditing] = useState(false);

  const [activeTab, setActiveTab] = useState("myPosts");
  const [myPosts, setMyPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [wantPosts, setWantPosts] = useState([]);

  const [activeModalPost, setActiveModalPost] = useState(null);
  const [commentInput, setCommentInput] = useState("");

  // 認証状態
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setUsername(u?.displayName || "ユーザー名");
    });
    return () => unsubAuth();
  }, [auth]);

  // 自分の投稿
  useEffect(() => {
    if (!user) { setMyPosts([]); return; }
    const q = query(
      collection(db, "posts"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setMyPosts(arr);
    });
    return () => unsub();
  }, [user]);

  // いいね
  useEffect(() => {
    if (!user) { setLikedPosts([]); return; }
    const q = query(collection(db, "posts"), where("likesBy", "array-contains", user.uid));
    const unsub = onSnapshot(q, (snap) => {
      const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      arr.sort((a, b) => {
        const ta = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
        const tb = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
        return tb - ta;
      });
      setLikedPosts(arr);
    });
    return () => unsub();
  }, [user]);

  // 行ってみたい
  useEffect(() => {
    if (!user) { setWantPosts([]); return; }
    const q = query(collection(db, "posts"), where("wantsBy", "array-contains", user.uid));
    const unsub = onSnapshot(q, (snap) => {
      const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      arr.sort((a, b) => {
        const ta = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
        const tb = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
        return tb - ta;
      });
      setWantPosts(arr);
    });
    return () => unsub();
  }, [user]);

  // ユーザー名更新
  const handleNameChange = async () => {
    if (!user) return;
    try {
      await updateProfile(user, { displayName: username });
      alert("ユーザー名を変更しました！");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("名前の変更に失敗しました");
    }
  };

  // 削除
  const handleDelete = async (postId) => {
    if (!window.confirm("本当に削除しますか？")) return;
    try {
      await deleteDoc(doc(db, "posts", postId));
      alert("削除しました");
    } catch (err) {
      console.error(err);
      alert("削除に失敗しました");
    }
  };

  // アクション
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

  const renderPosts = (list, withDelete = false) =>
    list.length ? (
      list.map((p) => {
        const liked = user && Array.isArray(p.likesBy) ? p.likesBy.includes(user.uid) : false;
        const wanted = user && Array.isArray(p.wantsBy) ? p.wantsBy.includes(user.uid) : false;
        const isRepeat = p.tags?.includes("また泊まりたい");
        const sortedComments = (p.comments || []).slice().sort(
          (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
        );

        return (
          <div key={p.id} className="post-with-comments">
            <article className={`review-card ${isRepeat ? "repeat" : ""}`}>
              <div className="review-left">
                {isRepeat && (
                  <div className="review-repeat-text">★また泊まりたいと評価されました！</div>
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
                  一泊値段帯：{!!p.price && <span className="price">{p.price}</span>}
                </div>

                {p.tags?.length > 0 && (
                  <div className="review-tags">
                    {p.tags.map((t, i) => (
                      <span key={`${t}-${i}`} className="tag">{t}</span>
                    ))}
                  </div>
                )}

                {p.title && <h3 className="review-title">{p.title}</h3>}
                {p.content && <p className="review-content">{p.content}</p>}

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
                      <FontAwesomeIcon icon={faComment} /> コメントする
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
                      <span className="date">
                        {p.createdAt.toDate().toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {withDelete && (
                  <button className="delete-btn" onClick={() => handleDelete(p.id)}>削除</button>
                )}
              </div>

              {p.imageUrl && (
                <div className="review-right">
                  <img src={p.imageUrl} alt={p.name} />
                </div>
              )}
            </article>

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
      })
    ) : (
      <p className="empty">まだありません。</p>
    );

  return (
    <div className="mypage">
      <section className="mypage-hero">
        <div className="hero-left">
          <div className="hero-label">プロフィール</div>

          {isEditing ? (
            <div className="hero-edit">
              <input
                className="hero-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ユーザー名"
              />
              <button className="hero-save" onClick={handleNameChange}>保存</button>
              <button className="hero-cancel" onClick={() => setIsEditing(false)}>キャンセル</button>
            </div>
          ) : (
            <div className="hero-name">
              <span className="hero-name-text">{username} さん</span>
            </div>
          )}
        </div>

        {!isEditing && (
          <div className="hero-right">
            <button className="name-edit-btn" onClick={() => setIsEditing(true)}>
              ユーザー名変更
            </button>
          </div>
        )}
      </section>

      <div className="mypage-tabs pretty">
        <button
          className={`tab ${activeTab === "myPosts" ? "active" : ""}`}
          onClick={() => setActiveTab("myPosts")}
        >
          自分の投稿
        </button>
        <button
          className={`tab ${activeTab === "likes" ? "active" : ""}`}
          onClick={() => setActiveTab("likes")}
        >
          いいね
        </button>
        <button
          className={`tab ${activeTab === "wants" ? "active" : ""}`}
          onClick={() => setActiveTab("wants")}
        >
          行ってみたい
        </button>
      </div>

      <div className="mypage-list">
        {activeTab === "myPosts" && renderPosts(myPosts, true)}
        {activeTab === "likes" && renderPosts(likedPosts)}
        {activeTab === "wants" && renderPosts(wantPosts)}
      </div>
    </div>
  );
};

export default Mypage;
