import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/practice-select.scss';
import '../assets/styles/global.scss';
import Layout from '../components/Layout';
import { Button } from '../components/Button';

const PracticeSelect = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* main */}
      <main className="practice-select__body">
        <div className="practice-select__wrap-buttons">
          <Button
            className="practice-select__button-default app-font"
            onClick={() => navigate('/practice-start')}
          >
            Default choice
          </Button>
          <Button
            className="practice-select__button-roulette app-font"
            onClick={() => navigate('/roulette-select')}
          >
            Roulette choice
          </Button>
        </div>
      </main>
    </Layout>
  );
};

export default PracticeSelect;
