import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {useState} from "react";
import './App.css';
import Navbar from './components/Navbar';
import Top from "./components/Top";
import Login from './components/Login';
import NewUserCreate from "./components/NewUserCreate";
import MyPage from "./components/MyPage";
import RouletteList from "./components/RouletteList";
import RouletteForm from "./components/RouletteForm";
import RouletteFormEdit from "./components/RouletteFormEdit";
import ScoreList from "./components/ScoreList";
import SelectRoulette from './components/SelectRoulette';
import RouletteChoise from './components/RouletteChoise';
import TypingStart from './components/TypingStart';
import TypingCount from './components/TypingCount';
import TypingQuest from "./components/TypingQuest";
import Results from './components/Results';
import Animation from "./components/Animation"

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/navber' element={<Navbar />}></Route>
        <Route path='/' element={<Top />}></Route>
        <Route path='/login' element={<Login />}>Login</Route>
        <Route path='/newusercreate' element={<NewUserCreate />}>Siginup</Route>
        <Route path='/mypage' element={<MyPage />}>MyPage</Route>
        <Route path='/scorelist' element={<ScoreList />}></Route>
        <Route path='/roulettelist' element={<RouletteList />}></Route>
        <Route path='/rouletteform' element={<RouletteForm />}></Route>
        <Route path='/rouletteformedit' element={<RouletteFormEdit />}></Route>        
        <Route path='/selectroulette' element={<SelectRoulette />}></Route>
        <Route path='/roulettechoise' element={<RouletteChoise />}></Route>
        <Route path='/typingstart' element={<TypingStart />}></Route>
        <Route path='/typingcount' element={<TypingCount />}></Route>
        <Route path='/typingquest' element={<TypingQuest />}></Route>
        <Route path='/results' element={<Results />}></Route>
        <Route path='/animation' element={<Animation />}></Route>
      </Routes>
    </Router>
  );
}


export default App;
