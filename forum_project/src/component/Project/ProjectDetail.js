import React, { useState } from "react";
import { useLocation } from "react-router";
import styles from "../../css/Project/ProjectDetail.module.css";
import { useHistory } from "react-router-dom";
import { firestore } from "../../firebase";
import { storage } from "../../firebase";
import firebase from "firebase/app";
import "firebase/auth";
const ProjectDetail = () => {
  const location = useLocation();
  const photo = location.state.photo;
  const projectName = location.state.name;

  const lang = location.state.lang;
  const [host, setHost] = useState("");
  let [appliedProject, setAppliedProject] = useState("");
  const [party, setParty] = useState(0);
  const history = useHistory();

  let user = firebase.auth().currentUser;
  let email, photoUrl, uid, emailVerified;

  if (user != null) {
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
  }
  const dataFire = JSON.parse(localStorage.getItem("fireStoreData")).filter(
    (eachData) => {
      if (eachData.name === projectName) return eachData;
    }
  );
  console.log("파이어베이스 데이터(필터링):", dataFire);
  const term = dataFire[0].term;
  const person = dataFire[0].party;
  const comment = dataFire[0].comment;

  // let addUserFireStore = async (userEmail) => {
  //   await firestore
  //     .collection("users")
  //     .doc(userEmail)
  //     .add({
  //       hostProject: [],
  //       joinProject: [],
  //       message: [],
  //       submittedProject: [],
  //       appliedProject: [userEmail],
  //     })
  //     .then(function () {
  //       //console.log("Document successfully written!");
  //     })
  //     .catch(function (error) {
  //       console.error("Error writing document: ", error);
  //     });
  // };

  return (
    <>
      <div className={styles.projectDetail}>
        <div className={styles.header}>
          <h2>프로젝트명:{projectName}</h2>
        </div>
        <div className={styles.projectEx}>
          <img src={photo}></img>

          <span className={styles.text}>
            <h3>사용 언어: {lang}</h3>
            <h3>예상기간:{term}</h3>
            <h3>예상인원:{party}</h3>
            <h3>현재지원자:</h3>
          </span>
        </div>
        <div className={styles.explain}>
          <h3>개요:{comment}</h3>
        </div>
        <div className={styles.btn}>
          <span>
            <button>관심 프로젝트 담기</button>
          </span>
          <span>
            <button style={{ marginLeft: "20px" }}>지원하기</button>
          </span>
          <span>
            <button
              style={{ marginLeft: "20px" }}
              onClick={() => history.goBack()}
            >
              취소
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
