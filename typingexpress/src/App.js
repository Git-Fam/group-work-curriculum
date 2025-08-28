import './App.css';
import './reset.css';
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import TopPage from './src/TopPage';
import Login from './src/Login';
import SignUp from "./src/SignUp";
import MyPage from './src/MyPage';
import ScoreListPage from './src/ScoreList';
import RouletteList from "./src/RouletteList"; 
import RouletteRegister from './src/RouletteRegister';
import TypingPracticeSelect from'./src/TypingPracticeSelect';
import Roulette from "./src/Roulette";
import Typing from "./src/Typing";
import Textanimation from"../src/src/components/Textanimation";

const appStyles = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/img/back-img.png)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  width: '100%',
};


function App() {
  
  return (
    <Router>
      <div style={appStyles}>
        <Textanimation />
          <div className='appbackground'>
          <Routes>
            <Route path="/" element={<TopPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/score-list" element={<ScoreListPage />} />
            <Route path="/roulette-list" element={<RouletteList />} />
            <Route path="/roulette-register" element={<RouletteRegister />} />
            <Route path="/typing-practice-select" element={<TypingPracticeSelect />} />
            <Route path="/roulette" element={<Roulette />} />
            <Route path="/typing" element={<Typing />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
