import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import "./css/Logout.css";
import Animation from "./Animation";

const Top = () => {


  return (
    <div className='body'>
      <div className='topBody'>
        <div className='baseColor baseBody'>
          <Animation/>
          <div className='topItem'>
            <h1 className='topTitle'>Typing <br />Express</h1>
            <div className='topButtonGroup'>
              <button className='navButton loginButton'>
                <Link to="/login">Login</Link>
              </button>
              <button className='navButton siginButton'>
                <Link to="/NewUserCreate">Signup</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Top;
