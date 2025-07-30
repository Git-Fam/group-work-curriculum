import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Logout.css";
import { useNavigate } from 'react-router-dom';

const Top = () => {



  return (
    <div className='body'>
      <div className='topBody'>
        <div className='baseColor topImg'>
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
