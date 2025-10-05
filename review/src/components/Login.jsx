import React from 'react';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import './Login.css';

import logoImg from '../images/logo.png';
import slide1 from '../images/login01.png';
import slide2 from '../images/login02.png';
import slide3 from '../images/login03.png';

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();

  const loginGoogle = () => {
    signInWithPopup(auth, provider).then(() => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    arrows: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="login-content">
          <p className="small-text">あなたの旅を、記録しよう</p>
          <p className="mid-text">
            だれかの宿泊体験が、<br />
            次の旅人へつながる⏤⏤⏤
          </p>
          <img src={logoImg} alt="泊まレコ" className="logo" />
  </div>

  <div className="pc-login-button">
    <button className="login-button" onClick={loginGoogle}>
      Googleでログイン
    </button>

        </div>
      </div>
      <div className="login-right">
        <Slider {...settings}>
          <div><img src={slide1} alt="Slide 1" className="room-image" /></div>
          <div><img src={slide2} alt="Slide 2" className="room-image" /></div>
          <div><img src={slide3} alt="Slide 3" className="room-image" /></div>
        </Slider>
    <button className="login-button mobile-login-button" onClick={loginGoogle}>
      Googleでログイン
    </button>
      </div>


    </div>
  );
};

export default Login;
