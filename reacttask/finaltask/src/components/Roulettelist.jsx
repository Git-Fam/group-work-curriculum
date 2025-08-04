import React from 'react'
import "./Roulettelist.css";
import { useNavigate } from 'react-router-dom';

const Roulettelist = () => {

  const navigate = useNavigate();
  const moveCreate = () => {
    navigate("/Rouletteadd")
  }

  const moveEdit = () => {
    navigate("/Rouletteedit")
  };

  return (
    <div className='rouletteWrapper'>
      <div className='rouletteList'>
        <div className='rouletteListTitle'>Roulette</div>

        <div className='roulettoList2'>

          <div className='listHeader'>
            <div className='headrTitle'>ルーレット</div>
            <button className='moveCreatePage' onClick={moveCreate}>新規作成</button>
          </div>

          <table className='rouletteList3'>
            <tr>
              <th className='titleB'>ルーレットタイトル</th>
              <th className='dateB'>作成日</th>
              <th className='editB'></th>
              <th className='deleteB'></th>
            </tr>

            <tr>
              <td>○○○○○○○○○○○</td>
              <td>2025/01/01</td>
              <td><button className='rouletteEdit' onClick={ moveEdit }>編集</button></td>
              <td><button className='rouletteDelete'>削除</button></td>
            </tr>


            <tr>
              <td>○○○○○○○○○○○</td>
              <td>2025/01/01</td>
              <td><button className='rouletteEdit' onClick={ moveEdit }>編集</button></td>
              <td><button className='rouletteDelete'>削除</button></td>
            </tr>
            
            <tr>
              <td>○○○○○○○○○○○</td>
              <td>2025/01/01</td>
              <td><button className='rouletteEdit' onClick={ moveEdit }>編集</button></td>
              <td><button className='rouletteDelete'>削除</button></td>
            </tr>
            
            <tr>
              <td>○○○○○○○○○○○</td>
              <td>2025/01/01</td>
              <td><button className='rouletteEdit' onClick={ moveEdit }>編集</button></td>
              <td><button className='rouletteDelete'>削除</button></td>
            </tr>
            
            <tr>
              <td>○○○○○○○○○○○</td>
              <td>2025/01/01</td>
              <td><button className='rouletteEdit' onClick={ moveEdit }>編集</button></td>
              <td><button className='rouletteDelete'>削除</button></td>
            </tr>
            
            <tr>
              <td>○○○○○○○○○○○</td>
              <td>2025/01/01</td>
              <td><button className='rouletteEdit' onClick={ moveEdit }>編集</button></td>
              <td><button className='rouletteDelete'>削除</button></td>
            </tr>
            
            <tr>
              <td>○○○○○○○○○○○</td>
              <td>2025/01/01</td>
              <td><button className='rouletteEdit' onClick={ moveEdit }>編集</button></td>
              <td><button className='rouletteDelete'>削除</button></td>
            </tr>

          </table>
          
        </div>
      </div>
    </div>
  ) 
}

export default Roulettelist