import "../css/App.css";
import React, { useState } from "react";
import Menu from "../component/Menu";
import Mypage from "../component/MyPage/MyPage";
import firebase from "firebase/app";
import "firebase/auth";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [login, setLogin] = useState(false);
  // const [menu, setMenu] = useState(0);

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  });

  return (
    <div className="App">
      <Router>
        <Menu login={login} setLogin={setLogin}></Menu>
      </Router>
    </div>
  );
}

export default App;
