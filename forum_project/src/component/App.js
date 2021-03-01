import "../css/App.css";
import React, { useState } from "react";
import Menu from "../component/Menu";

import firebase from "firebase/app";
import "firebase/auth";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { firestore } from "../firebase";
import { storage } from "../firebase";
import { useEffect } from "react";

let dataFire = null;

function App() {
  const [login, setLogin] = useState(false);
  const [isClick, setIsClick] = useState(false);
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  });

  function delay(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  }

  let getFireBaseImage = (image) => {
    return storage
      .ref("project")
      .child(image)
      .getDownloadURL()
      .then((url) => {
        return url;
      })
      .catch((error) => {
        console.log("이미지를 받아오지 못했습니다." + error);
      });
  };

  useEffect(async () => {
    let result = await getFirestoreData();
    await delay(1000);
    let resultString = JSON.stringify(result); //로컬스토리지에는 문자열만 넣을 수 있음
    localStorage.setItem("fireStoreData", resultString);
    dataFire = localStorage.getItem("fireStoreData");
  }, []);

  let getFirestoreData = async () => {
    let eachStore = [];
    let result = await firestore
      .collection("project")
      .get()
      .then(function (querySnapshot) {
        //result는 await를 하기 위해서 만들어낸 변수
        querySnapshot.forEach(async function (doc) {
          let image = await getFireBaseImage(doc.data().image);
          let eachData = {
            comment: doc.data().comment,
            finish: doc.data().finish,
            host: doc.data().host,
            image: image,
            name: doc.data().name,
            party: doc.data().party,
            people: doc.data().people,
            signed: doc.data().signed,
            skill: doc.data().skill,
            term: doc.data().term,
          };
          eachStore.push(eachData);
        });
      });
    return eachStore;
  };

  return (
    <div className="App">
      <Router>
        <Menu
          login={login}
          setLogin={setLogin}
          isClick={isClick}
          setIsClick={setIsClick}
        ></Menu>
      </Router>
    </div>
  );
}

export default App;
