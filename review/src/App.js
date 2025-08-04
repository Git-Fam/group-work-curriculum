import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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


function AppWrapper({ isAuth, setIsAuth }) {
  const location = useLocation();


  const hideSidebarRoutes = ["/login"];
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      {!shouldHideSidebar && <Sidebar isLoggedIn={isAuth} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/logout" element={<Logout setIsAuth={ setIsAuth} />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/postcheck" element={<PostCheck />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </div>
  );
}

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Router>
      <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} />
    </Router>
  );
}

export default App;
