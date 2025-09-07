import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RouletteList.css";
import "../App.css";
import Header from "./components/Header/Headerlogout";

const RouletteList = () => {
  const navigate = useNavigate();
  const [roulettes, setRoulettes] = useState([]);

  // ローカルストレージからルーレットデータを取得
  useEffect(() => {
    const storedRoulettes = JSON.parse(localStorage.getItem("roulettes")) || [];
    setRoulettes(storedRoulettes);
  }, []);

  // 削除処理
  const handleDelete = (id) => {
    if (window.confirm("本当に削除しますか？")) {
      const updatedRoulettes = roulettes.filter((roulette) => roulette.id !== id);
      setRoulettes(updatedRoulettes);
      localStorage.setItem("roulettes", JSON.stringify(updatedRoulettes));
    }
  };

  return (
    <div className="roulette-list-Page">
      <Header />
      
      <div className="roulette-list-container">
        <h1 className="registertitle">Roulette</h1>
        
        <div className="roulette-list-container2">
          <h2>ルーレット</h2>
          <button className="create-btn roulette-list-btn green" onClick={() => navigate("/roulette-register")}>
            <span>新規作成</span>
          </button>
        </div>
        <div className="roulette-tablecontainer">
          <table className="roulette-table">
            <thead>
              <tr>
                <th>ルーレットタイトル</th>
                <th>作成日</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {roulettes.map((roulette) => (
                <tr key={roulette.id}>
                  <td>{roulette.title}</td>
                  <td>{roulette.date}</td>
                  <td>
                    <button  className="edit-btn roulette-list-btn" onClick={() => navigate("/roulette-register", { state: roulette })}>
                      編集
                    </button>
                  </td>
                  <td>
                    <button  className="delete-btn roulette-list-btn" onClick={() => handleDelete(roulette.id)}>削除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      
    </div>
  );
};

export default RouletteList;