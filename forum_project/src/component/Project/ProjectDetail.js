import React, { useState } from "react";
import { useLocation } from "react-router";
import styles from "../../css/Project/ProjectDetail.module.css";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import { firestore } from "../../firebase";
import auth from "firebase/auth";

function ProjectDetail() {
  let location = useLocation();
  let photo = location.state.photo;
  let name = location.state.name;
  let period = location.state.period;
  let person = location.state.person;
  let lang = location.state.lang;
  let applied = null;
  let account = undefined;

  let history = useHistory();

  let dataFire = JSON.parse(localStorage.getItem("fireStoreData")).filter(
    (eachData) => {
      if (eachData.name === name) return eachData;
    }
  );
  console.log("파이어베이스 데이터(필터링):", dataFire);
  let term = dataFire[0].term;
  let party = dataFire[0].party;
  let signed = dataFire[0].signed;
  let comment = dataFire[0].comment;
  let host = dataFire[0].host; //프로젝트 주인장 아이디
  console.log("프로젝트의 이름은 다음과 같습니다 : " + name);
  console.log("프로젝트를 등록한 유저의 아이디는 다음과 같습니다 : " + host);

  function delay(ms) {
    return new Promise((resolve, reject) => {
      //promise 객체 반환, async도 promise를 다루는 기술이란 것을 잊지 말것
      setTimeout(resolve, ms);
    });
  }

  let checkLogInUser = () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log("머리 뜨겁네" + user.email);
        account = user.email;
      } else {
        console.log("위에서 반환이 되지 않으면 undefined가 나감");
      }
    });
  };

  let readProjectData = (account) => {
    firestore
      .collection("users")
      .doc(account)
      .get()
      .then(async function (doc) {
        if (doc.exists) {
          applied = doc.data().appliedProject;
          console.log("가져온 친구는 다음과 같습니다" + applied);
        } else {
          console.log("문서가 존재하지 않습니다");
        }
      });
  };
  //----------------------------------------------------------------------------------

  let applyProject = async () => {
    checkLogInUser(); //프로젝트 신청자 아이디
    await delay(800);
    readProjectData(account);
    await delay(800);
    console.log("account는 다음과 같음" + account);
    console.log("applied는 다음과 같음" + applied);
    if (account === undefined) {
      alert("로그인을 하셔야 프로젝트에 지원 하실 수 있으세요");
    } else if (account === host) {
      alert("자기 프로젝트에는 지원하실 수 없어요ㅠㅠ");
    } else if (applied.includes(name) === true) {
      alert("이미 지원하신 프로젝트입니다");
    } else {
      await firestore
        .collection("users")
        .doc(host)
        .update({
          submittedProject: firebase.firestore.FieldValue.arrayUnion({
            applicant: account,
            project: name,
          }),
        });
      await firestore
        .collection("users")
        .doc(account)
        .update({
          appliedProject: firebase.firestore.FieldValue.arrayUnion(name),
        });
      await delay(1500);
      alert("지원을 성공적으로 마치셨습니다.");
      window.location.reload();
    }
  };

  return (
    <>
      <div className={styles.projectDetail}>
        <div className={styles.header}>
          <h2>프로젝트명: {name}</h2>
        </div>

        <div>
          <img className={styles.img} src={photo}></img>
        </div>
        <div className={styles.text}>
          <div>예상기간: {term}</div>
          <div style={{ marginTop: "2vh" }}>예상인원: {party}명</div>
          <div style={{ marginTop: "2vh" }}>현재지원: {signed}명</div>
          <div style={{ marginTop: "2vh" }}>
            사용언어:{" "}
            {dataFire.map((eachData) => {
              {
                return eachData.skill.map((skill) => {
                  console.log(skill);
                  return <span className={styles.skill}>{skill}</span>;
                });
              }
            })}
          </div>
        </div>

        <div className={styles.explain}>
          <h3>
            프로젝트 설명
            <br />
            {comment}
          </h3>
        </div>
        <div className={styles.btn}>
          <span>
            <button onClick={applyProject}>지원하기</button>
          </span>
          <span>
            <button
              style={{ marginLeft: "6vh" }}
              onClick={() => history.goBack()}
            >
              뒤로가기
            </button>
          </span>
        </div>
      </div>
    </>
  );
}

export default ProjectDetail;
