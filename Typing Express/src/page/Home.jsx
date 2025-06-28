import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/global.scss';
import '../assets/styles/home.scss';
import Layout from '../components/Layout';
import { Button } from '../components/Button';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="home-card">
        <h1 className="app-name home-app-name">
          <div className="app-text app-text-top">Typing</div>
          <div className="app-text app-text-bottom">Express</div>
        </h1>
        <div className="home-button-area">
          <Button
            className="home-button-login button-login button-page-jump"
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button
            className="home-button-signup button-signup button-page-jump"
            onClick={() => navigate('/signup')}
          >
            Signup
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
