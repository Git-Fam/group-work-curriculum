import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./RouletteRegister.css";
import Header from "./components/Header/Headerlogout";

const RouletteRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialState = location.state || { title: "", options: [""], date: "" };
  const isEditing = !!initialState.title;
  const [title, setTitle] = useState(initialState.title);
  const [options, setOptions] = useState(initialState.options);
  const [date, setDate] = useState(initialState.date || new Date().toISOString().split("T")[0]);

  // 新しい選択肢を追加
  const addOption = () => {
    setOptions([...options, ""]);
  };

  // 選択肢を削除
  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  // フォーム送信処理（登録 or 更新）
  const handleSubmit = (event) => {
    event.preventDefault();
    const newRoulette = { id: Date.now(), title, options, date };

    //リストを取得
    const storedRoulettes = JSON.parse(localStorage.getItem("roulettes")) || [];

    if (initialState.title) {
      //編集
      const updatedRoulettes = storedRoulettes.map((r) =>
        r.id === initialState.id ? newRoulette : r
      );
      localStorage.setItem("roulettes", JSON.stringify(updatedRoulettes));
    } else {
      //新規登録
      localStorage.setItem("roulettes", JSON.stringify([...storedRoulettes, newRoulette]));
    }

    alert("ルーレットが登録されました！");
    navigate("/roulette-list");
  };

  const handleDelete = () => {
    if (window.confirm("本当に削除しますか？")) {
      const storedRoulettes = JSON.parse(localStorage.getItem("roulettes")) || [];
      const updatedRoulettes = storedRoulettes.filter(r => r.id !== initialState.id);
      localStorage.setItem("roulettes", JSON.stringify(updatedRoulettes));
      alert("ルーレットを削除しました");
      navigate("/roulette-list");
    }
  };
  
  return (
    <div className="roulette-register-Page">
      <Header />
      
      <div  className="roulette-register-container">
        <h1 className="registertitle">Roulette-Form</h1>
        <form  className="roulette-register-form" onSubmit={handleSubmit}>

          <div className="formcontainer">
            <p>タイトル</p>
            <div className="titleformcontainer">
            <input type="text" value={title} className="titleform" onChange={(e) => setTitle(e.target.value)} required />
            </div>
          </div>
          
          <div className="formcontainer2">
            <div className="optioncontainer2">
              <p>問題</p>
              <div className="option-container2">
                {options.map((option, index) => (
                  <div key={index} className="option-container">
                    <input type="text" className="option-input" value={option} onChange={(e) => {
                      const newOptions = [...options];
                      newOptions[index] = e.target.value;
                      setOptions(newOptions);
                    }} required />
                    <button className="deretebutton" type="button" onClick={() => removeOption(index)}>削除</button>
                  </div>
                ))}
              </div>
              <button type="button"onClick={addOption} className="plusbutton">問題追加</button>
            </div>
          </div>
          
          <button
            type="submit"
            className={`rouletteregister-btn ${isEditing ? "update-btn" : "create-btn"}`}
          >
            {isEditing ? "更新" : "登録"}
          </button>

          {isEditing && (
            <button type="button" className="delete-btn2" onClick={handleDelete}>
              削除
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default RouletteRegister;