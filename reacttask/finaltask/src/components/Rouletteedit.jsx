import React from 'react'
import "./Rouletteedit.css";
import { useNavigate } from 'react-router-dom';

const Rouletteedit = () => {
  const navigate = useNavigate();

  const changeRouletteB = () => {
    navigate("/Roulettelist")
  };
  const deleteRouletteB = () => {
    navigate("/Roulettelist")
  };

  return (
    <div className='editWrapper'>
      <div className='editPageForm'>
        <div className='editPageTitle'>Roulette-Form</div>
          
        <form className='rouletteForm'>
          <div className='formTitle'>
            <label for='title' className='labelQ'>タイトル</label>
            <input 
            type='text' 
            placeholder='○○○○○○○○○'
            id='title' 
            name='title'/>
          </div>

          <div className='inputForm'>

            <div className='q'>
              <label for='q1'>問題1</label>
              <div className='insideQ'>
                <input
                type='text'
                placeholder='○○○○○○○○○'
                id='q1'
                name='q1'/>
                <button className='deleteRoulette'>削除</button>
              </div>
            </div>

            <div className='q'>
              <label for='q2'>問題2</label>
              <div className='insideQ'>
                <input
                type='text'
                placeholder='○○○○○○○○○'
                id='q2'
                name='q2'/>
                <button className='deleteRoulette'>削除</button>
              </div>
            </div>

            <div className='q'>
              <label for='q3'>問題3</label>            
              <div className='insideQ'>
                <input
                type='text'
                placeholder='○○○○○○○○○'
                id='q3'
                name='q3'/>
                <button className='deleteRoulette'>削除</button>
              </div>
            </div>

            <div className='q'>
              <label for='q4'>問題4</label>
              <div className='insideQ'>
                <input
                type='text'
                placeholder='○○○○○○○○○'
                id='q4'
                name='q4'/>
                <button className='deleteRoulette'>削除</button>
              </div>
            </div>

            <div className='q'>
              <label for='q5'>問題5</label>
              <div className='insideQ'>
                <input
                type='text'
                placeholder='○○○○○○○○○'
                id='q5'
                name='q5'/>
                <button className='deleteRoulette'>削除</button>
              </div>

              <button className='addQ'>問題追加</button>

            </div>

          </div>
          <div className='editBotton'>
            <button className='changeRoulette' onClick={changeRouletteB}>変更</button>
            <button className='deleteRoulette2' onClick={deleteRouletteB}>削除</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Rouletteedit