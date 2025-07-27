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
import ScoreList from "./components/ScoreList";
import SelectRoulette from './components/SelectRoulette';
import RouletteChoise from './components/RouletteChoise';
import TypingPractice from './components/TypingPractice';

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
        <Route path='/selectroulette' element={<SelectRoulette />}></Route>
        <Route path='/roulettechoise' element={<RouletteChoise />}></Route>
        <Route path='/typingpractice' element={<TypingPractice />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
