import React from "react";
import styles from "../../css/MyPage/ApplyStatus.module.css";
import auth from "firebase/auth";
import firebase from "firebase/app";
import { firestore } from "../../firebase";
import { useEffect } from "react";
import { useState } from "react";

const ApplyStatus = (props) => {

  let appliedData;
  let name, email, photoUrl, uid, emailVerified;

  const [appliedProjectData, setAppliedProjectData] = useState([]);

  useEffect(async () => {
    let user = firebase.auth().currentUser;
    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;
    }

    await getMyAppliedProject(email);
    await delay(1000);
    console.log('등록된 프로젝트', appliedData)
    setAppliedProjectData(appliedData);
  }, []);

  function delay(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  }

  let getMyAppliedProject = async (email) => {
    firebase
      .firestore()
      .collection("users")
      .doc(email)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          appliedData = doc.data().appliedProject;
        } else {
          console.log("문서가 존재하지 않습니다");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={styles.header}>
      <div className={styles.table}>
        <div className={styles.title}>
          <li>프로젝트</li>
          <li>신청현황</li>
          <li>신청취소</li>
        </div>
        <div>{appliedProjectData.map(el => {
          return <div>{el}</div>
        })}</div>
      </div>
    </div>
  );
};

export default ApplyStatus;
