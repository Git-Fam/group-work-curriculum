import React, { useEffect } from 'react';
import {useState} from "react";
import "./RouletteForm.css";
import {addDoc, collection} from 'firebase/firestore';
import {auth,db} from "../firebase";
import Navbar from "./Navbar";



const RouletteForm = () => {

    const [count, setCount] = useState(1);

    const [list, setList] = useState("");
    const [list1, setList1] = useState("");    
    const [addList, setAddList] = useState([]);
    

    const createList = () => {
        setCount(count + 1);
    }


    const createRoulette = async () => {
        const allList = [...addList, list, list1];
        await addDoc(collection(db, "roulette"),{
            addList: allList,
            id: auth.currentUser.uid
        })
        setList("");
    }

    const addNewTask =() => {
    this.setState({
      tasks: [...this.state.tasks,
      {
          task_name: "", 
          start_datetime: "", 
          end_datetime: "", 
          task_memo: ""
      }]
    });
    }

    return ( 
        <>
        <div className='body'>
            <div className='baseColor'>
                <Navbar />
                <div className='RouletteFormBody'>
                    <div className='baseBG onUserBG'>
                        <h2>Roulette-Form</h2>
                        <div className='madeRoulette'>
                            <div className='rouletteTitle'>
                                <label>タイトル</label>
                                <input type="text" placeholder='〇〇〇〇〇〇〇〇〇' />
                            </div>
                        
                            <div className='rouletteQuestion'>
                                <div className='rouletteQuestionFlex'>
                                    <div>
                                        <label>問題1</label>
                                        <div className='question'>
                                            <input type="text" placeholder='〇〇〇〇〇〇〇〇〇'></input>
                                            <button className='delete'>削除</button>
                                        </div>
                                    </div>
                                    <div>
                                        <label>問題2</label>
                                        <div className='question'>
                                            <input type="text" placeholder='〇〇〇〇〇〇〇〇〇' />
                                            <button className='delete'>削除</button>
                                        </div>
                                    </div>
                                    <div>
                                        <label>問題3</label>
                                        <div className='question'>
                                            <input type="text" placeholder='〇〇〇〇〇〇〇〇〇' />
                                            <button className='delete'>削除</button>
                                        </div>
                                    </div>
                                    <div>
                                        <label>問題4</label>
                                        <div className='question'>
                                            <input type="text" placeholder='〇〇〇〇〇〇〇〇〇' />
                                            <button className='delete'>削除</button>
                                        </div>
                                    </div>
                                    <div>
                                        <label>問題5</label>
                                        <div className='question'>
                                            <input type="text" placeholder='〇〇〇〇〇〇〇〇〇' />
                                            <button className='delete'>削除</button>
                                        </div>
                                    </div>
                                </div>

                                <button className='addQuestion'>問題追加</button>
                            </div>
                            <button className='upQuestion formButton'>登録</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default RouletteForm;