import React, { useState, useEffect } from "react";
import styles from "../../css/MyPage/MyProjectList.module.css";
import firebase from "firebase/app";
import { firestore } from "../../firebase";
import auth from "firebase/auth";
import { useHistory } from "react-router-dom";
// import Slider from "react-slick";
let joinedData = undefined;
const MyProjectList = (props) => {
  const history = useHistory();
  let user = firebase.auth().currentUser;
  let name, email, photoUrl, uid, emailVerified;

  const [joinedProject, setJoinedProject] = useState([]);
  console.log("유저 정보", user);
  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
  }

  let dataFire = JSON.parse(localStorage.getItem("fireStoreData"));
  let myRegistedProject = dataFire.filter((el) => {
    if (el.host === email) return el;
  });
  console.log("파이어베이스 데이터(전체):", dataFire);

  //------------------------------------------------------------------------------

  let myJoinedProject = dataFire.filter((el) => {
    let people = el.people;

    if (String(people) === email && el.host !== email) return el;
    // for (let i = 0; i < people.length; i++) {
    //   if (String(el.people) === email && el.host !== email) return el;
    // }
  });

  useEffect(async () => {
    let user = firebase.auth().currentUser;
    await delay(100);
    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;
    }

    getMyJoinedProject();
    await delay(1000);
    //console.log(JSON.stringify(submittedData))
    setJoinedProject(joinedData);
    await delay(1000);
  }, []);

  function delay(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  }

  let getMyJoinedProject = () => {
    firestore
      .collection("project")
      .doc()
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log(doc.data());
          joinedData = doc.data();
        } else {
          console.log("문서가 존재하지 않습니다");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //-------------------------------------------------------------------------------

  let photo = null;
  let projectName = null;
  let period = null;
  let person = null;
  let lang = null;

  let handleClick = (e) => {
    console.log("e.target:", e.target);
    photo = e.target.src;
    projectName = e.target.name;
    period = e.target.period;
    person = e.target.person;
    lang = e.target.lang;
    console.log(
      "이미지:",
      photo,
      "이름:",
      projectName,
      "기간:",
      period,
      "인원:",
      person,
      "스킬",
      lang
    );
    history.push({
      pathname: "/mypage/myprojectlistdetail",
      state: {
        photo: photo,
        name: projectName,
        period: period,
        person: person,
        lang: lang,
      },
    });
  };

  return (
    <div className={styles.header}>
      <div>내가 등록한 프로젝트</div>
      <div className={styles.firstContainer}>
        {myRegistedProject.map((eachData) => {
          return (
            <div className={styles.cardwraper}>
              <div className={styles.card}>
                <div className={styles.card_img}>
                  <img
                    src={eachData.image}
                    className={styles.photo}
                    onClick={handleClick}
                  ></img>
                </div>
              </div>
              <ul>
                <li>프로젝트 : {eachData.name}</li>
                <li>예상기간 : {eachData.term}</li>
                <li>현재인원 : {eachData.party}명</li>
                <li>
                  사용언어 :{" "}
                  {eachData.skill.map((el) => {
                    return <span className={styles.skill}>{el}</span>;
                  })}
                </li>
              </ul>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "5vh" }}>내가 참가 중인 프로젝트</div>
      <div className={styles.secondContainer}>
        {myJoinedProject.map((eachData) => {
          console.log(eachData);
          return (
            <div className={styles.cardwraper}>
              <div className={styles.card}>
                <div className={styles.card_img}>
                  <img src={eachData.image} className={styles.photo}></img>
                </div>
              </div>
              <ul>
                <li>프로젝트 이름: {eachData.name}</li>
                <li>예상 기간: {eachData.term}</li>
                <li>현재 인원: {eachData.party}</li>
                <li>
                  사용언어 :{" "}
                  {eachData.skill.map((el) => {
                    return <span className={styles.skill}>{el}</span>;
                  })}
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyProjectList;
