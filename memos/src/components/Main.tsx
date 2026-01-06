import React from 'react';
import "./Main.css";
import ReactMarkdown from "react-markdown";

interface Memo {
    id: string; //メモの一意なID
    title: string; //メモのタイトル
    content: string; //メモの本文
    modDate: number; //メモの更新日時
}

interface MainProps {
    activeMemo: Memo | null;
    onUpdateMemo: (upDatedMemo: Memo) => void;
}

const Main: React.FC<MainProps> = ({ activeMemo, onUpdateMemo }) => {
    const onEditMemo = (key: keyof Memo, value: string) => {
        if (activeMemo) {
            onUpdateMemo({
                ...activeMemo,
                [key]: value,
                modDate: Date.now(),
            });
        }
    };

    if (!activeMemo) {
        return <div className = 'no-active-memo'>メモが選択されていません</div>
    }

    return (
        <div className = "app-main">
        <div className = "app-main-edit">
            <input
                id = "title"
                type = "text"
                value = {activeMemo.title}
                onChange = {(e) => onEditMemo("title", e.target.value)}
            />
            <textarea
                id = "content"
                placeholder = "メモ内容を記入"
                value = {activeMemo.content}
                onChange = {(e) => onEditMemo("content", e.target.value)}
            ></textarea> 
        </div>
        <div className="app-main-memo-preview">
            <h1 className = "preview-title">{activeMemo.title}</h1>
             <div className = "markdown-preview">
                <ReactMarkdown>
                  {activeMemo.content}
                </ReactMarkdown>
                </div>
             </div>
        </div>
    );
    };

export default Main;