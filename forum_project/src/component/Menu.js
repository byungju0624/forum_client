import "../css/Menu.css";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import React from "react";

import MainPage from "../component/MainPage/MainPage";
import Guide from "../component/Guide/Guide";
import Project from "../component/Project/Project";
import Regist from "../component/Regist/Regist";
import MyPage from "../component/MyPage/MyPage";
import ProjectDetail from "../component/Project/ProjectDetail";
import firebase from "firebase/app";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";
import auth from "firebase/auth"; //이게 있어야 오류가 안난다
import { firestore } from "../firebase";

function Menu(props) {
  function delay(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  }

  let googleLogin = () => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().onAuthStateChanged(async (user) => {
          if (user) {
            await checkMemberShip(user.email);
          } else {
            firebase
              .auth()
              .signInWithPopup(provider)
              .then(async () => {
                props.setLogin(true);
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

  let checkMemberShip = (userEmail) => {
    firestore
      .collection("users")
      .doc(userEmail)
      .get()
      .then(async function (doc) {
        if (doc.exists) {
          console.log("이랏샤이 마세!!!!!!");
        } else {
          await addUserFireStore(userEmail);
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  let addUserFireStore = async (userEmail) => {
    await firestore
      .collection("users")
      .doc(userEmail)
      .set({
        hostProject: [],
        joinProject: [],
        message: [],
        submittedProject: [],
        appliedProject: [],
      })
      .then(function () {})
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  let googleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        props.setLogin(false);
        window.location.reload();
      })
      .catch(function (error) {});
  };
  let menuRef = React.createRef();
  let loginRef = React.createRef();
  let hamburgerClick = () => {
    return (
      menuRef.current.classList.toggle("active"),
      loginRef.current.classList.toggle("active")
    );
  };
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar_logo">
            <Link to="/">
              <h1 className="logo">플젝하쉴?!</h1>
            </Link>
          </div>

          <ul className="navbar_menu" ref={menuRef}>
            <Link to="/guide">
              <li className="menu">가이드</li>
            </Link>
            <Link to="/project">
              <li className="menu">프로젝트 열람</li>
            </Link>

            {props.login === true ? (
              <Link to="/regist">
                <li className="menu">프로젝트 등록</li>
              </Link>
            ) : (
              <li
                className="menu"
                onClick={() => {
                  alert("먼저 로그인을 해주세요");
                }}
              >
                프로젝트 등록
              </li>
            )}

            {props.login === true ? (
              <Link to="/mypage/profile">
                <li className="menu">프로젝트 관리</li>
              </Link>
            ) : (
              <li
                className="menu"
                onClick={() => {
                  alert("먼저 로그인을 해주세요");
                }}
              >
                프로젝트 관리
              </li>
            )}
          </ul>
          <div className="navbar_login" ref={loginRef}>
            {props.login === false ? (
              <img
                className="login_image"
                src="image/login.png"
                onClick={googleLogin}
              ></img>
            ) : (
              <Link to="/">
                <img
                  className="login_image"
                  src="image/signed.png"
                  onClick={googleLogout}
                ></img>
              </Link>
            )}
          </div>
          <div className="hamburger">
            <FontAwesomeIcon icon={faHamburger} onClick={hamburgerClick} />
          </div>
        </nav>
        <Link to="/projectdetail"></Link>

        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/guide" component={Guide} />
          <Route exact path="/project" component={Project} />
          <Route exact path="/projectdetail" component={ProjectDetail} />
          <Route exact path="/regist" component={Regist} />
          <Route exact path="/mypage/profile" component={MyPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default React.memo(Menu);
