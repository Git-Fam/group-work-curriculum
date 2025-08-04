import React from 'react'
import "./Rouletteadd.css";
import { useNavigate } from 'react-router-dom';

const Rouletteadd = () => {

  const navigate = useNavigate();
  const addRouletteB = () => {
    navigate("/Roulettelist")
  };

  return (
    <div className='addWrapper'>
      <div className='addPageForm'>
        <div className='addPageTitle'>Roulette-Form</div>
          
        <div className='rouletteForm'>
          <div className='formTitle'>
            <div className='labelQ'>タイトル</div>
            <input 
            type='text' 
            placeholder='○○○○○○○○○'
            />
          </div>

          <div className='inputForm'>

            <div className='q'>
              <div className='q1'>問題1</div>
              <div className='insideQ'>
                <input
                type='text'
                placeholder='○○○○○○○○○'
                />
                <button className='deleteRoulette'>削除</button>
              </div>
            </div>

            <div className='q'>
              <div className='q2'>問題2</div>
              <div className='insideQ'>
                <input
                type='text'
                placeholder='○○○○○○○○○'
                />
                <button className='deleteRoulette'>削除</button>
              </div>
            </div>

            <div className='q'>
              <div className='q3'>問題3</div>            
              <div className='insideQ'>
                <input
                type='text'
                placeholder='○○○○○○○○○'
                />
                <button className='deleteRoulette'>削除</button>
              </div>
            </div>

            <div className='q'>
              <div className='q4'>問題4</div>
              <div className='insideQ'>
                <input
                type='text'
                placeholder='○○○○○○○○○'
                />
                <button className='deleteRoulette'>削除</button>
              </div>
            </div>

            <div className='q'>
              <ldiv className='q5'>問題5</ldiv>
              <div className='insideQ'>
                <input
                type='text'
                placeholder='○○○○○○○○○'
                />
                <button className='deleteRoulette'>削除</button>
              </div>

              <button className='addQ'>問題追加</button>

            </div>

          </div>

          <button className='addRoulette' onClick={ addRouletteB }>登録</button>

        </div>
      </div>
    </div>
  )
}

export default Rouletteadd