import React from "react";
import styles from "../../css/MyPage/MyProjectList.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import { storage } from "../../firebase";
import auth from "firebase/auth";
import { firestore } from "../../firebase";

const MyProjectList = (props) => {
  const history = useHistory();

  let user = firebase.auth().currentUser;
  let name, email, photoUrl, uid, emailVerified;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
  }

  let hostProjectData, joinedProjectData;

  let myRegisted = [];
  let myJoined = [];
  const [myRegistedProject, setMyRegistedProject] = useState([]);
  const [myJoinedProject, setMyJoinedProject] = useState([]);

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

    await getMyHostData(email);
    await getMyJoinedData(email);
    await delay(1000);

    setMyRegistedProject(myRegisted);
    await delay(1000);
    setMyJoinedProject(myJoined);
    await delay(1000);
  }, []);

  function delay(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  }

  let getMyHostData = async (email) => {
    firebase
      .firestore()
      .collection("users")
      .doc(email)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          hostProjectData = doc.data().hostProject;
          getMyRegistedProject(hostProjectData);
        } else {
          console.log("문서가 존재하지 않습니다");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let getMyJoinedData = async (email) => {
    firebase
      .firestore()
      .collection("users")
      .doc(email)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          joinedProjectData = doc.data().joinProject;
          getMyJoinedProject(joinedProjectData);
        } else {
          console.log("문서가 존재하지 않습니다");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let getMyRegistedProject = async (data) => {
    data.map((el) => {
      firebase
        .firestore()
        .collection("project")
        .doc(el)
        .get()
        .then((doc) => {
          let docData = doc.data();
          getFireBaseImage(docData.image) //
            .then((url) => {
              docData.image = url;
            });

          myRegisted.push(docData);
        });
    });
  };

  let getMyJoinedProject = async (data) => {
    data.map((el) => {
      firebase
        .firestore()
        .collection("project")
        .doc(el)
        .get()
        .then((doc) => {
          let docData = doc.data();
          getFireBaseImage(docData.image).then((url) => {
            docData.image = url;
          });
          myJoined.push(docData);
        });
    });
  };

  let getFireBaseImage = async (image) => {
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

  let photo = null;
  let projectName = null;
  let period = null;
  let person = null;
  let lang = null;

  let handleClick = (e) => {
    photo = e.target.src;
    projectName = e.target.name;
    period = e.target.period;
    person = e.target.person;
    lang = e.target.lang;

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
                    name={eachData.name}
                    period={eachData.term}
                    person={eachData.party}
                    lang={eachData.skill}
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
          console.log("리턴의 참가 프로젝트:", eachData);
          return (
            <div className={styles.cardwraper}>
              <div className={styles.card}>
                <div className={styles.card_img}>
                  <img
                    src={eachData.image}
                    name={eachData.name}
                    period={eachData.term}
                    person={eachData.party}
                    lang={eachData.skill}
                    className={styles.photo}
                  ></img>
                </div>
              </div>
              <ul>
                <li>프로젝트 이름:{eachData.name}</li>
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
