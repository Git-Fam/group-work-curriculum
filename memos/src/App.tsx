import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { v4 as uuid } from "uuid";
import './components/app.css';
import React from "react";


interface Memo {
  id: string; //メモの一意なID
  title: string; //メモのタイトル
  content: string; //メモの内容
  modDate: number; //メモの最終更新日時
}



function App() {

  const [memos, setMemos] = useState<Memo[]>(
    JSON.parse(localStorage.getItem("memos") || "[]")
  );

  const [activeMemo, setActiveMemo] = useState<string | null>(null);

  useEffect(() => {
  localStorage.setItem("memos", JSON.stringify(memos));
},[memos]);

useEffect(() => {
  if (memos.length > 0 && !activeMemo) {
    setActiveMemo(memos[0].id);
  }
}, [memos]);

  function onAddMemo() {
    console.log("新しくメモが更新されました");
    const newMemo: Memo = {
      id: uuid(),
      title: "新しいメモ",
      content: "新しいメモの内容",
      modDate: Date.now(),
    };
    setMemos([...memos, newMemo]);
    console.log(memos);
  }

const onDeleteMemo = (id: string) => {
  const filterMemos = memos.filter((memo) => memo.id !== id);
  setMemos(filterMemos);
};

const getActiveMemo = () => {
  return memos.find((memo) => memo.id === activeMemo) ||null;
};

const onUpdateMemo = (updatedMemo: Memo) => {
  const updatedMemosArray = memos.map((memo) =>
    memo.id === updatedMemo.id ? updatedMemo : memo);
    setMemos(updatedMemosArray);
};

  return (
    <div className= "App">
      <Sidebar 
        onAddMemo = {onAddMemo}
        memos = {memos}
        onDeleteMemo = {onDeleteMemo}
        activeMemo = {activeMemo}
        setActiveMemo = {setActiveMemo}
       />
       <Main 
         activeMemo = {getActiveMemo()}
         onUpdateMemo = {onUpdateMemo}
        />
    </div>
  );
}




export default App;