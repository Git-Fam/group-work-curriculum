import { BrowserRouter as Router, Routes, Link, Route } from"react-router-dom"
import './App.css';
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import CreatePost from "./components/CreatePost";
import Ranking from "./components/Ranking";
import PostCheck from "./components/PostCheck";
import Mypage from "./components/Mypage";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(false)

  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/createpost" element={<CreatePost />}></Route>
        <Route path="/ranking" element={<Ranking />}></Route>
        <Route path="/postcheck" element={<PostCheck />}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
      </Routes>
    </Router>

  );
}

export default App;
