import "../css/App.css";
import React, { useState } from "react";
import Menu from "../component/Menu";
import MainPage from "../component/MainPage/MainPage";
import Guide from "../component/Guide/Guide";
import Project from "../component/Project/Project";
import MyPage from "../component/MyPage/MyPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [login, setLogin] = useState(false);
  const [menu, setMenu] = useState(0);
  /*const login = React.createContext(false)
	const selected = React.createContext(1)*/

  console.log("현재 선택된 버튼은 다음과 같습니다." + menu);

  return (
    <div className="App">
      <Router>
        <Menu
          login={login}
          setLogin={setLogin}
          menu={menu}
          setMenu={setMenu}
        ></Menu>
      </Router>
    </div>
  );
}

export default App;

/*
Reute.js
/ = {}
/guide = {}
*/
