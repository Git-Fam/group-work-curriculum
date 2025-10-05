import React, { useEffect, useState, useRef } from "react";
import "./CreatePost.css";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";


export const initialFormData = {
  name: "",
  address: "",
  facility: "",
  stayDate: "",
  rating: "",
  price: "",
  title: "",
  content: "",
  tags: [],
  repeat: false,
};

const DRAFT_KEY = "draftPost";

const CreatePost = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  const [geoLoading, setGeoLoading] = useState(false);
const abortRef = useRef(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));

    if (location.state?.reset) {
      resetForm();
    } else if (location.state) {
      setFormData((p) => ({ ...p, ...location.state }));
      if (location.state.imageFile) setImageFile(location.state.imageFile);
    } else {
      const draft = localStorage.getItem(DRAFT_KEY);
      if (draft) {
        try {
          const parsed = JSON.parse(draft);
          setFormData((p) => ({ ...p, ...parsed.formData }));
        } catch {}
      }
    }

    return () => unsub();
  }, [auth, location.state]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (type === "checkbox" && id === "repeat") {
      setFormData((prev) => {
        const newTags = checked
          ? [...prev.tags, "また泊まりたい"].filter((v, i, a) => a.indexOf(v) === i)
          : prev.tags.filter((t) => t !== "また泊まりたい");
        return { ...prev, repeat: checked, tags: newTags };
      });
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        tags: checked
          ? [...prev.tags, value]
          : prev.tags.filter((t) => t !== value),
      }));
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const goConfirm = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("ログインしてから投稿してください。");
      return;
    }
    setLoading(true);

    const stateForCheck = {
      ...formData,
      imageFile,
      author: user.displayName || "匿名ユーザー",
      userId: user.uid,
    };

    localStorage.setItem(DRAFT_KEY, JSON.stringify({ formData }));
    navigate("/postcheck", { state: stateForCheck });
    setLoading(false);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setImageFile(null);
    localStorage.removeItem(DRAFT_KEY);
  };

    const locateFromCurrentPosition = async () => {
    if (geoLoading) return;
    setGeoLoading(true);

    try {
      const position = await new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("この端末・ブラウザでは位置情報が使えません。"));
          return;
        }
        navigator.geolocation.getCurrentPosition(
          resolve,
          (err) => reject(new Error(err.message || "位置情報を取得できませんでした。")),
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );
      });

      const { latitude, longitude } = position.coords;

      abortRef.current?.abort?.();
      const controller = new AbortController();
      abortRef.current = controller;

      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2&accept-language=ja`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!res.ok) throw new Error("住所の取得に失敗しました。");
      const data = await res.json();

      const addressText =
        data?.display_name ||
        [
          data?.address?.postcode,
          data?.address?.state,
          data?.address?.county,
          data?.address?.city || data?.address?.town || data?.address?.village,
          data?.address?.suburb,
          data?.address?.road,
          data?.address?.house_number,
        ]
          .filter(Boolean)
          .join(" ");

      if (!addressText) throw new Error("住所を特定できませんでした。");

      setFormData((prev) => ({ ...prev, address: addressText }));
    } catch (e) {
      alert(e.message || "現在地から住所を取得できませんでした。");
    } finally {
      setGeoLoading(false);
    }
  };

  return (
    <div className="post-container">
      <form className="post-form" onSubmit={goConfirm}>
        <h2>基本情報</h2>
        <label htmlFor="name">宿泊地名称</label>
        <input id="name" type="text" value={formData.name} onChange={handleChange} required />

<label htmlFor="address">住所</label>
<div className="input-with-button">
  <input
    id="address"
    type="text"
    value={formData.address}
    onChange={handleChange}
    required
  />
  <button
    type="button"
    className="geo-btn"
    onClick={locateFromCurrentPosition}
    disabled={geoLoading}
    aria-live="polite"
  >
    {geoLoading ? "検索中…" : "現在地から探す"}
  </button>
</div>

        <label htmlFor="facility">設備メモ</label>
        <input id="facility" type="text" placeholder="エレベーターの有無、アメニティ詳細など" value={formData.facility} onChange={handleChange} />

        <label htmlFor="stayDate">宿泊日</label>
        <input id="stayDate" type="date" value={formData.stayDate} onChange={handleChange} />

        <h2>評価 & 価格帯</h2>
        <label htmlFor="rating">星評価</label>
        <select id="rating" value={formData.rating} onChange={handleChange}>
          <option value="" disabled hidden></option>
          <option value="1">★</option>
          <option value="2">★★</option>
          <option value="3">★★★</option>
          <option value="4">★★★★</option>
          <option value="5">★★★★★</option>
        </select>

        <label htmlFor="price">価格帯（一泊）</label>
        <select id="price" value={formData.price} onChange={handleChange}>
          <option value="" disabled hidden></option>
          <option>5,000〜10,000円</option>
          <option>10,000〜20,000円</option>
          <option>20,000〜30,000円</option>
          <option>30,000〜40,000円</option>
          <option>40,000〜50,000円</option>
          <option>50,000〜70,000円</option>
          <option>70,000〜100,000円</option>
          <option>100,000円以上</option>
        </select>

        <h2>口コミ詳細</h2>
        <label htmlFor="title">タイトル</label>
        <input id="title" type="text" value={formData.title} onChange={handleChange} required />

        <label htmlFor="content">口コミ内容</label>
        <textarea id="content" rows={4} value={formData.content} onChange={handleChange} required />

        <h2>タグ</h2>
        <div className="tags">
          <div className="tag-text">施設の特徴・こだわり</div>
          <div className="tag-check">
          {["温泉あり", "Wi-Fiあり", "ランドリー設備あり", "アメニティあり", "駐車場あり", "サウナあり", "ペットOK", "駅近", "露天付客室"].map((tag) => (
            <label key={tag}>
              <input type="checkbox" value={tag} checked={formData.tags.includes(tag)} onChange={handleChange} />
              {tag}
            </label>
          ))}
          </div>
        </div>

        <div className="repeat">
          <div className="repeat-text">リピート意向</div>
          <div className="repeat-check">
          <label>
            <input id="repeat" type="checkbox" checked={formData.repeat} onChange={handleChange} />
            また泊まりたい
          </label>
          </div>
        </div>
        
<div className="point">
  <div className="point-text">イチオシポイント</div>
  <div className="point-check">
    <label className="file-upload-label">
      ファイル選択
      <input
        type="file"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        className="file-input"
      />
    </label>
    <span className="file-hint">とっておきの一枚を共有してください</span>
  </div>
</div>


  <button type="submit" className="submit-btn" disabled={loading}>
    {loading ? "送信中..." : "確認する"}
  </button>
</form>
    </div>
  );
};

export default CreatePost;
