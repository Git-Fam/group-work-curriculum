import React from 'react';
import {Link} from "react-router-dom";
import "./css/RouletteList.css";
import Navbar from "./Navbar";

const RouletteList = () => {
  return (
    <>
    <div className='body'>
      <div className='baseColor'>
        <Navbar />
        <div className='rouletteListBody'>
          <div className='baseBG onUserBG'>
            <h2>Roulette</h2>
            <div className='form'>
                <div className='rouletteListBase'>
                    <p className='subTitle'>ルーレット</p>
                    <button className='formButton newRoulette'>
                        <Link to={"/rouletteform"}>新規作成</Link>
                    </button>                    
                </div>
                <div className='tableBody'>
                  <table className='rouletteList'>
                      <tr>
                          <th>ルーレットタイトル</th>
                          <th>作成日</th>
                          <th></th>
                          <th></th>
                      </tr>
                      <tr>
                          <td className='titleTD'>〇〇〇〇〇〇〇〇〇〇〇</td>
                          <td className='dateTD'>2025/01/01</td>
                          <td><button className='ediButton'>編集</button></td>
                          <td><button>削除</button></td>
                      </tr>
                      <tr>
                          <td className='titleTD'>〇〇〇〇〇〇〇〇〇〇〇</td>
                          <td className='dateTD'>2025/01/01</td>
                          <td><button className='ediButton'>編集</button></td>
                          <td><button>削除</button></td>
                      </tr>
                      <tr>
                          <td className='titleTD'>〇〇〇〇〇〇〇〇〇〇〇</td>
                          <td className='dateTD'>2025/01/01</td>
                          <td><button className='ediButton'>編集</button></td>
                          <td><button>削除</button></td>
                      </tr>
                      <tr>
                          <td className='titleTD'>〇〇〇〇〇〇〇〇〇〇〇</td>
                          <td className='dateTD'>2025/01/01</td>
                          <td><button className='ediButton'>編集</button></td>
                          <td><button>削除</button></td>
                      </tr>
                      <tr>
                          <td className='titleTD'>〇〇〇〇〇〇〇〇〇〇〇</td>
                          <td className='dateTD'>2025/01/01</td>
                          <td><button className='ediButton'>編集</button></td>
                          <td><button>削除</button></td>
                      </tr>
                      <tr>
                          <td className='titleTD'>〇〇〇〇〇〇〇〇〇〇〇</td>
                          <td className='dateTD'>2025/01/01</td>
                          <td><button className='ediButton'>編集</button></td>
                          <td><button>削除</button></td>
                      </tr>
                      <tr>
                          <td className='titleTD'>〇〇〇〇〇〇〇〇〇〇〇</td>
                          <td className='dateTD'>2025/01/01</td>
                          <td><button className='ediButton'>編集</button></td>
                          <td><button>削除</button></td>
                      </tr>
                  </table>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default RouletteList;
