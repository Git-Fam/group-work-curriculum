import React from 'react';
import { useState } from 'react';
import './Sidebar.css';

//Propsの型を定義
interface Memo {
    id: string; //メモの一意なID
    title: string; //メモのタイトル
    content: string; //メモの本文
    modDate: number; //メモの最終更新日時
};

//SidebarコンポーネントのProps(親コンポーネントApp.tsxから受け取った値)
interface SidebarProps {
    onAddMemo: () => void;
    memos: Memo[];
    onDeleteMemo: (id: string) => void;
    activeMemo: string | null;
    setActiveMemo: (id: string) => void;
};

//React.FC<SidebarProps>を使ってSidebarの型を指定
const Sidebar: React.FC<SidebarProps> = ({
     onAddMemo,
     memos, 
     onDeleteMemo, 
     activeMemo, 
     setActiveMemo 
    }) => {
        const sortedMemos = [...memos].sort((a, b) => b.modDate - a.modDate);

        const [searchQuery, setSearchQuery] = useState("");

        const filteredMemos = sortedMemos.filter((memo) =>
            memo.title.includes(searchQuery) || memo.content.includes(searchQuery));

        return (
            <div className = 'app-sidebar'>
                <div className = 'app-sidebar-header'>
                    <h1>メモ</h1>
                    <div className = 'app-sidebar-header-right'>
                        <input
                            type = "text"
                            placeholder = "メモを検索..."
                            value = {searchQuery}
                            onChange = {(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="app-sidebar-header-button" onClick = {onAddMemo}>追加</button>
                    </div>
                </div>
                <div className = 'app-sidebar-memos'>
                    {/* 検索結果があるかチェック */}
                    {filteredMemos.length > 0 ? (
                        filteredMemos.map((memo) => (
                            <div
                            className = {`app-sidebar-memo ${memo.id === activeMemo && "active"}`}
                            key = {memo.id}
                            onClick = {() => setActiveMemo(memo.id)}
                        >
                        <div className = "sidebar-memo-title">
                            <strong>{memo.title}</strong>
                            <button onClick = {() => onDeleteMemo(memo.id)}>削除</button>
                        </div>
                        <p>{memo.content}</p>
                        <small>
                            {new Date(memo.modDate).toLocaleDateString("ja-jp", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </small>       
                        </div>
                    ))
                    ) : (
                        // メモが見つからない場合の表示
                        <div className = "no-memos">
                            <p>一致するメモがありません</p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    export default Sidebar;