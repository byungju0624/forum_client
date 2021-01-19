import { useContext } from "react";
import "../css/Menu.css";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import React from "react";
import login from "../component/App";
import selected from "../component/App";
import MainPage from "../component/MainPage/MainPage";
import Guide from "../component/Guide/Guide";
import Project from "../component/Project/Project";
import Regist from "../component/Regist/Regist";
import MyPage from "../component/MyPage/MyPage";
import ProjectDetail from "../component/Project/ProjectDetail";
import firebase from "firebase/app";
import auth from "firebase/auth"; //이게 있어야 오류가 안난다
import { firestore } from "../firebase";

function Menu(props) {
  let provider = new firebase.auth.GoogleAuthProvider();

  let googleLogin = () => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            console.log("로그인이 되어 있습니다");
          } else {
            firebase
              .auth()
              .signInWithPopup(provider)
              .then(() => {
                props.setLogin(true);
                console.log("로그인");
              })
              .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                let email = error.email;
                let credential = error.credential;
              });
          }
        });
      });
  };

	let googleLogout = () => {
		firebase.auth().signOut().then(function() {
			props.setLogin(false)
			console.log("로그아웃을 성공적으로 실시함")
			window.location.reload();
		}).catch(function(error) {
			// An error happened.
		});
	}


  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>

            <h1 className="logo">플젝하쉴?!</h1>

          </Link>
          <nav className="nav">
            <Link
              to="/guide"
              style={{ textDecoration: "none", color: "black" }}
            >

              <span className="menu">가이드</span>

            </Link>
            <Link
              to="/project"
              style={{ textDecoration: "none", color: "black" }}
            >

              <span className="menu">프로젝트 열람</span>

            </Link>

            {props.login === true ? (
              <Link
                to="/regist"
                style={{ textDecoration: "none", color: "black" }}
              >

                <span className="menu">프로젝트 등록</span>

              </Link>
            ) : (
              <span
                className="menu"
                onClick={() => {
                  alert("먼저 로그인을 해주세요");
                }}
              >
                프로젝트 등록
              </span>
            )}
            {props.login === true ? (
              <Link
                to="/mypage/profile"
                style={{ textDecoration: "none", color: "black" }}
              >

                <span className="menu">프로젝트 관리</span>

              </Link>
            ) : (
              <span
                className="menu"
                onClick={() => {
                  alert("먼저 로그인을 해주세요");
                }}
              >
                프로젝트 관리
              </span>
            )}
          </nav>
          {props.login === false ? (
            <img
              className="login_image"
              src="image/login.png"
              onClick={googleLogin}
            ></img>
          ) : (
						<Link
						to="/"
						>
            <img
              className="login_image"
              src="image/signed.png"
              onClick={googleLogout}
            ></img>
						</Link>
          )}
        </header>
        <Link to="/projectdetail"></Link>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/guide" component={Guide} />
          <Route exact path="/project" component={Project} />
          <Route exact path="/projectdetail" component={ProjectDetail} />
          <Route exact path="/regist" component={Regist} />
          <Route exact path="/mypage" component={MyPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default React.memo(Menu);

