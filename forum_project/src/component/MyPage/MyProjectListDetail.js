import styles from "../../css/MyPage/MyProjectListDetail.module.css";
import { useState } from "react";
import { firestore } from "../../firebase";

import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { memo } from "react";

let submittedData;
let appliedUser = [];
let joinUser = [];
let submittedApplyObject = [];

const MyProjectListDetail = memo(() => {
  //넘어온 프로젝트 이름을 통해 데이터베이스에서 검색
  const location = useLocation();
  const projectName = location.state.name;
  let dataFire = JSON.parse(localStorage.getItem("fireStoreData"));
  let projectData = dataFire.filter((el) => {
    if (el.name === projectName) return el;
  });

  const [comment, setComment] = useState(projectData[0].comment);
  const [host, setHost] = useState("");
  const [party, setParty] = useState(projectData[0].party);
  const [skill, setSkilled] = useState(projectData[0].skill);
  const [term, setTerm] = useState(projectData[0].term);
  const history = useHistory();

  function delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setHost(user.email);
    } else {
      console.log("유저 없는 뎁쇼");
    }
  });

  let updateDatabase = async () => {
    firestore
      .collection("project")
      .doc(projectData[0].name)
      .update({
        comment: comment,
        party: party,
        skill: skill,
        term: term,
      })
      .then(function () {
        alert("프로젝트 수정에 성공했습니다");
        console.log(localStorage.fireStoreData);
        history.push("/mypage/myprojectlist");
      })
      .catch(function (error) {
        console.error("다음과 같은 에러가 발생했습니다 : " + error);
      });
  };

  //------------------------------------------------------------------------------------------------------------------------프로젝트 지우기

  let deleteProjectData = async () => {
    await getMySubmittedProject(host);
    await delay(500);

    await findUserApplyDeleteProject(projectName);
    await delay(200);

    await delay(200);
    await deleteProjectAppliedUser(projectName);
    await delay(200);
    await findJoinProjectUser(host, projectName);
    await delay(200);
    await deleteUserJoinProject(joinUser, projectName);
    await delay(200);
    await deleteHostProject(host, projectName);
    await delay(200);
    await submittedDataInHostDelete(host);
    await delay(200);
    firestore
      .collection("project")
      .doc(projectName)
      .delete()
      .then(() => {
        alert("프로젝트를 성공적으로 삭제했습니다");
        history.push("/mypage/myprojectlist");
      })
      .catch((error) => {
        console.error("다음과 같은 에러가 발생했습니다 : " + error);
      });
  };

  let deleteHostProject = (host, projectName) => {
    firestore
      .collection("users")
      .doc(host)
      .update({
        hostProject: firebase.firestore.FieldValue.arrayRemove(projectName),
      });
  };

  let findJoinProjectUser = (host, projectName) => {
    firebase
      .firestore()
      .collection("project")
      .doc(projectName)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          for (let i = 0; i < doc.data().people.length; i++) {
            if (doc.data().people[i] !== host) {
              joinUser.push(doc.data().people[i]);
            }
          }
        } else {
          console.log("문서가 존재하지 않음");
        }
      });
  };

  let deleteUserJoinProject = (joinUser, projectName) => {
    joinUser.map((index) => {
      firebase
        .firestore()
        .collection("users")
        .doc(index)
        .update({
          joinProject: firebase.firestore.FieldValue.arrayRemove(projectName),
        });
    });
  };

  let submittedDataInHostDelete = (host) => {
    submittedApplyObject.map((index) => {
      firebase //
        .firestore()
        .collection("users")
        .doc(host)
        .update({
          submittedProject: firebase.firestore.FieldValue.arrayRemove(index),
        });
    });
  };

  let getMySubmittedProject = (host) => {
    firebase
      .firestore()
      .collection("users")
      .doc(host)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          submittedData = doc.data().submittedProject;
        } else {
          console.log("문서가 존재하지 않습니다");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let findUserApplyDeleteProject = (projectName) => {
    if (appliedUser.length === 0) {
      submittedData.map((index) => {
        if (index["project"] === projectName) {
          submittedApplyObject.push(index);
          appliedUser.push(index["applicant"]);
        }
      });
    }
  };

  let deleteProjectAppliedUser = async (projectName) => {
    appliedUser.map((index) => {
      firebase
        .firestore()
        .collection("users")
        .doc(index)
        .update({
          appliedProject: firebase.firestore.FieldValue.arrayRemove(
            projectName
          ),
        });
    });
  };

  return (
    <div className={styles.regist}>
      <div className={styles.projectint}>
        <span>
          <p>프로젝트 이름 :{projectData[0].name}</p>
          <div style={{ marginTop: "10px" }}>
            <img src={projectData[0].image} style={{ width: "40vh" }} />
          </div>
        </span>
        <span>
          <p>
            모집 인원 :{" "}
            <input
              style={{ border: "3px solid black", fontWeight: "bold" }}
              type="number"
              value={party}
              placeholder={projectData[0].party}
              onChange={(e) => setParty(e.target.value)}
            ></input>{" "}
            명
          </p>
          <p>등록 인원 :{projectData[0].signed}명</p>
          <p>
            예상 기간 :{" "}
            <input
              style={{ border: "3px solid black", fontWeight: "bold" }}
              type="date"
              value={term}
              placeholder={projectData[0].term}
              onChange={(e) => setTerm(e.target.value)}
            ></input>
          </p>
          <div>
            사용 언어 :
            <div className={styles.teckstack}>
              <li>
                사용 언어① : <div style={{ width: "50%" }}>{skill[0]}</div>
              </li>
              <li>
                사용 언어② : <div style={{ width: "50%" }}>{skill[1]}</div>
              </li>
              <li>
                사용 언어③ : <div style={{ width: "50%" }}>{skill[2]}</div>
              </li>
            </div>
          </div>
        </span>
      </div>
      <div style={{ marginLeft: "0%", marginTop: "10vh" }}>
        <p>
          프로젝트 개요 :{" "}
          <div style={{ paddingTop: "20px" }}>
            <textarea
              placeholder={projectData[0].comment}
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{
                width: "50vh",
                height: "15vh",
                border: "3px solid black",
                fontWeight: "bold",
              }}
            ></textarea>
          </div>
        </p>
      </div>
      <div className={styles.registbtn}>
        <span>
          <button onClick={updateDatabase}>수정하기</button>
        </span>
        <span style={{ paddingLeft: "6vh" }}>
          <button onClick={deleteProjectData}>삭제하기</button>
        </span>
      </div>
    </div>
  );
});
export default MyProjectListDetail;
