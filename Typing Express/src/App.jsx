import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/styles/reset.css';
import Home from './page/Home.jsx';
import Login from './page/Login.jsx';
import Signup from './page/Signup.jsx';
import Mypage from './page/Mypage.jsx';
import { AuthProvider } from './assets/contexts/AuthContext';
import RouletteList from './page/Roulette-list.jsx';
import RouletteForm from './page/Roulette-form.jsx';
import PracticeSelect from './page/Practice-select.jsx';
import TypingPractice from './page/Typing-practice.jsx';
import RouletteSelectScreen from './page/RouletteSelectScreen.jsx';
import TypingPracticeStartScreen from './page/TypingPracticeStartScreen.jsx';
import TypingResultScreen from './page/TypingResultScreen.jsx';
import ScoreList from './page/ScoreList.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/roulette-list" element={<RouletteList />} />
          <Route path="/roulette-form" element={<RouletteForm />} />
          <Route path="/roulette-form/:id" element={<RouletteForm />} />
          <Route path="/roulette-select" element={<RouletteSelectScreen />} />
          <Route path="/practice-select" element={<PracticeSelect />} />
          <Route
            path="/practice-start"
            element={<TypingPracticeStartScreen />}
          />
          <Route path="/practice/:id?" element={<TypingPractice />} />
          <Route path="/practice-result" element={<TypingResultScreen />} />
          <Route path="/score-list" element={<ScoreList />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
