import React, { useEffect } from 'react';
import "./css/RouletteForm.css";
import Navbar from "./Navbar";
import Quest from './Quest';
import { useNavigate } from 'react-router-dom';
import Animation from "./Animation";


const RouletteForm = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const number = document.querySelectorAll('.questList span');
        for (let i = 0; i < number.length; i++){
            number[i].textContent = `問題${i + 1}`;
        }
    },[]);

    const goRouletteList = () =>{
        navigate("/roulettelist");
    }    
 
    return ( 
        <>
        <div className='body'>
            <div className='baseColor'>
                <Navbar />
                <Animation/>
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
                                    <Quest />
                                    <Quest />
                                    <Quest />
                                    <Quest />
                                    <Quest />
                                </div>

                                <button className='addQuestion'>問題追加</button>
                            </div>
                            <button className='upQuestion mainButtonDesign' onClick={goRouletteList}>登録</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default RouletteForm;
