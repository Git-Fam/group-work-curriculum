import { BrowserRouter as Router,Routes,Route,Link } from "react-router-dom";
import './App.css';
import Top from "./components/Top";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Mypage from "./components/Mypage";
import Scorelist from "./components/Scorelist";
import Roulettelist from "./components/Roulettelist";
import Rouletteadd from "./components/Rouletteadd";
import Rouletteedit from "./components/Rouletteedit";
import Typingselect from "./components/Typingselect";
import Rouletteselect from "./components/Rouletteselect";
import Typingpractice from "./components/Typingpractice";
import Typingpractice2 from "./components/Typingpractice2";
import Typingresult from "./components/Typingresult";

function App() {

  const initialURL = "http://api.quotable.io/random";

  return (
    <Router>
      <Routes>
        <Route path="/"element={<Top/>}></Route>
        <Route path="/Signin"element={<Signin/>}></Route>
        <Route path="/Signup"element={<Signup/>}></Route>
        <Route path="/Mypage"element={<Mypage/>}></Route>
        <Route path="/Scorelist"element={<Scorelist/>}></Route>
        <Route path="/Roulettelist"element={<Roulettelist/>}></Route>
        <Route path="/Rouletteadd"element={<Rouletteadd/>}></Route>
        <Route path="/Rouletteedit"element={<Rouletteedit/>}></Route>
        <Route path="/Typingselect"element={<Typingselect/>}></Route> 
        <Route path="/Rouletteselect"element={<Rouletteselect/>}></Route>
        <Route path="/Typingpractice"element={<Typingpractice/>}></Route>
        <Route path="/Typingpractice2"element={<Typingpractice2/>}></Route>
        <Route path="/Typingresult"element={<Typingresult/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
