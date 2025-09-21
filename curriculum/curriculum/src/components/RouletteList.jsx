import React from 'react';
import {Link} from "react-router-dom";
import "./css/RouletteList.css";
import Navbar from "./Navbar";
import RouletteListItem from './RouletteListItem';


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
                    <button className='mainButtonDesign newRoulette'>
                        <Link to={"/rouletteform"}>新規作成</Link>
                    </button>                    
                </div>
                <div className='tableBody'>
                  <table className='rouletteList'>
                      <tr>
                          <th>ルーレットタイトル</th>
                          <th className='thDate'>作成日</th>
                          <th className='thButton'></th>
                          <th className='thButton'></th>
                      </tr>
                      <RouletteListItem />
                      <RouletteListItem />
                      <RouletteListItem />
                      <RouletteListItem />
                      <RouletteListItem />
                      <RouletteListItem />
                      <RouletteListItem />
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
