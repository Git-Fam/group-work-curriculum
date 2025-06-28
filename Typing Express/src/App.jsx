import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/styles/reset.css';
import Home from './page/Home.jsx';
import Login from './page/Login.jsx';
import Signup from './page/Signup.jsx';
import Mypage from './page/Mypage.jsx';
import { AuthProvider } from './assets/contexts/AuthContext';
import PrivateRoute from './assets/contexts/PrivateRoute.jsx';
import RouletteList from './page/Roulette-list.jsx';
import RouletteForm from './page/Roulette-form.jsx';
import PracticeSelect from './page/Practice-select.jsx';
import TypingPractice from './page/Typing-practice.jsx';
import RouletteSelectScreen from './page/RouletteSelectScreen.jsx';
import TypingPracticeStartScreen from './page/TypingPracticeStartScreen.jsx';
import TypingResultScreen from './page/TypingResultScreen.jsx';
import ScoreList from './page/ScoreList.jsx';
import PublicRouteOnly from './components/PublicRouteOnly';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* 公開ルート */}
          <Route path="/" element={<Home />} />

          {/* ログイン済みのユーザーのアクセス制限 */}
          <Route element={<PublicRouteOnly />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          {/* プライベートルート */}
          <Route element={<PrivateRoute />}>
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
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
