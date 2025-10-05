import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PostCheck.css";
import { db, storage } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faComment, faThumbsUp } from "@fortawesome/free-regular-svg-icons";

const PostCheck = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const [loading, setLoading] = useState(false);

  if (!data) return <p>投稿データがありません</p>;

  const isRepeat = data.tags?.includes("また泊まりたい");

  const handleBack = () => {
    navigate(-1, { state: data });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      let imageUrl = "";
      if (data.imageFile) {
        const imageRef = ref(storage, `posts/${Date.now()}_${data.imageFile.name}`);
        await uploadBytes(imageRef, data.imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "posts"), {
        name: data.name,
        address: data.address,
        facility: data.facility || "",
        stayDate: data.stayDate || "",
        rating: data.rating || "",
        price: data.price || "",
        title: data.title,
        content: data.content,
        tags: data.tags || [],
        repeat: data.repeat || false,
        imageUrl,
        author: data.author,
        userId: data.userId,
        createdAt: Timestamp.now(),
        likes: 0,
        wants: 0,
        likesBy: [],
        wantsBy: [],
        comments: [],
      });

      alert("投稿しました！");
      navigate("/createpost", { state: { reset: true } });
    } catch (err) {
      console.error("投稿エラー:", err);
      alert("投稿に失敗しました");
    }

    setLoading(false);
  };

  return (
    <div className="postcheck-container">
      <div className={`review-card ${isRepeat ? "highlight-repeat" : ""}`}>
        <div className="review-top">
          <div className="review-left">
            {isRepeat && (
              <div className="repeat-banner">
                ★ また泊まりたいと評価されました！
              </div>
            )}

            <div className="review-header">
              <h2 className="review-name">{data.name}</h2>
              <p className="review-address">{data.address}</p>
            </div>

            <div className="review-meta">
              <span className="stars">
                {Array.from({ length: 5 }).map((_, idx) => {
                  const rating = Number(data.rating) || 0;
                  if (idx + 1 <= Math.floor(rating)) {
                    return <span key={idx} className="star full">★</span>;
                  } else if (idx < rating) {
                    return <span key={idx} className="star half">★</span>;
                  } else {
                    return <span key={idx} className="star empty">★</span>;
                  }
                })}
              </span>
              {data.price && (
                <>
                  一泊値段帯：<span className="price">{data.price}</span>
                </>
              )}
            </div>

            {data.tags?.length > 0 && (
              <div className="review-tags">
                {data.tags.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            )}

            {data.title && <h3 className="review-title">{data.title}</h3>}
            {data.content && <p className="review-content">{data.content}</p>}
          </div>

          {data.imageFile && (
            <div className="review-right">
              <img
                src={URL.createObjectURL(data.imageFile)}
                alt={data.name}
              />
            </div>
          )}
        </div>

        <div className="review-bottom">
          <div className="review-actions">
            <button className="action-btn">
              <FontAwesomeIcon icon={faThumbsUp} /> いいね (0)
            </button>
            <button className="action-btn">
              <FontAwesomeIcon icon={faComment} /> コメント
            </button>
            <button className="action-btn">
              <FontAwesomeIcon icon={faBookmark} /> 行ってみたい (0)
            </button>
          </div>

          <div className="review-footer">
            <span className="author">{data.author || "匿名ユーザー"}</span>
            <span className="date">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="buttons">
        <button onClick={handleBack} disabled={loading} className="btn-back">戻る</button>
        <button onClick={handleSubmit} disabled={loading} className="btn-submit">
          {loading ? "送信中..." : "投稿する"}
        </button>
      </div>
    </div>
  );
};

export default PostCheck;
