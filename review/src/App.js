import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import CreatePost from "./components/CreatePost";
import Ranking from "./components/Ranking";
import PostCheck from "./components/PostCheck";
import Mypage from "./components/Mypage";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

function AppWrapper({ isAuth, setIsAuth }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const protectedRoutes = ["/", "/createpost", "/ranking", "/postcheck", "/mypage"];
  if (!isAuth && protectedRoutes.includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

console.log('Sidebar', typeof Sidebar, Sidebar);
console.log('Home', typeof Home, Home);
console.log('Login', typeof Login, Login);
console.log('Logout', typeof Logout, Logout);
console.log('CreatePost', typeof CreatePost, CreatePost);
console.log('Ranking', typeof Ranking, Ranking);
console.log('PostCheck', typeof PostCheck, PostCheck);
console.log('Mypage', typeof Mypage, Mypage);


  return (
    <div className={`app-layout ${isLoginPage ? "login-page-layout" : ""}`}>
      {!isLoginPage && (
        <div className="sidebar-area">
          <Sidebar
            mode="pc"
            openLogoutModal={() => setShowLogoutModal(true)}
          />
        </div>
      )}

      <div className="main-area">
        {!isLoginPage && (
          <Sidebar
            mode="mobile"
            openLogoutModal={() => setShowLogoutModal(true)}
          />
        )}

        <Routes>
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/postcheck" element={<PostCheck />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>

        {showLogoutModal && (
          <Logout
            setIsAuth={setIsAuth}
            onClose={() => setShowLogoutModal(false)}
          />
        )}
      </div>
    </div>
  );
}

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") === "true");

  return (
    <Router>
      <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} />
    </Router>
  );
}

export default App;
