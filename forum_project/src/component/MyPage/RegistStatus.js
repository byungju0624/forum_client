import React, { memo } from "react";
import styles from "../../css/MyPage/RegistStatus.module.css";
import firebase from "firebase/app";
import { firestore } from "../../firebase";

import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

let submittedData = undefined;
let name, email, photoUrl, uid, emailVerified;

const RegistStatus = memo((props) => {
  const history = useHistory();

  const [submittedProjectData, setSubmittedProjectData] = useState([]);

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

    getMySubmittedProject(email);
    await delay(1000);

    setSubmittedProjectData(submittedDataProcessingProjectName(submittedData));
    await delay(1000);
  }, []);

  function delay(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  }

  //-------------------------------------------------------------------------------------------- 데이터 불러와 서 프론트 팀이 원하는 형식으로 가공

  let getMySubmittedProject = (email) => {
    firebase
      .firestore()
      .collection("users")
      .doc(email)
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

  let submittedDataProcessingProjectName = (dataArray) => {
    let eachProject = []; //중복을 체크하기 위한 배열
    let resultArray = [];
    for (let i = 0; i < dataArray.length; i++) {
      if (eachProject.includes(dataArray[i].project) !== true) {
        let stinrg = dataArray[i].project;
        let object = { [stinrg]: [] };
        //현재 해당 프로젝트가 없다면(중복 방지)
        eachProject.push(dataArray[i].project);
        resultArray.push(object);
      }
    }

    for (let j = 0; j < resultArray.length; j++) {
      for (let k = 0; k < dataArray.length; k++) {
        let key = String(Object.keys(resultArray[j]));

        if (key === dataArray[k].project) {
          resultArray[j][key].push(dataArray[k].applicant);
        }
      }
    }
    return resultArray;
  };

  //----------------------------------------------------------------------------------------------승인

  let getApprovedSubmmit = async (projectName, user) => {
    await ProjectDataUpdate(projectName, user);
    await applyUserDataApprovedUpdate(projectName, user);
    await deleteSubmmitApprovedData(email, user, projectName);
    await delay(1000);
    window.location.reload();
  };

  let ProjectDataUpdate = (projectName, user) => {
    firestore
      .collection("project")
      .doc(projectName)
      .update({
        people: firebase.firestore.FieldValue.arrayUnion(user),
        signed: firebase.firestore.FieldValue.increment(1),
      })
      .then(function () {
        console.log("업데이트가 성공적으로 끝남");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let applyUserDataApprovedUpdate = (projectName, user) => {
    firestore
      .collection("users")
      .doc(user)
      .update({
        appliedProject: firebase.firestore.FieldValue.arrayRemove(projectName),
        joinProject: firebase.firestore.FieldValue.arrayUnion(projectName),
        message: firebase.firestore.FieldValue.arrayUnion(
          `프로젝트 ${projectName}에 참가가 승인 되었습니다`
        ),
      })
      .then(() => {
        return history.push("/mypage/profile");
      });
  };

  let deleteSubmmitApprovedData = (host, user, projectName) => {
    let objectDelete = { applicant: user, project: projectName };
    firestore
      .collection("users")
      .doc(host)
      .update({
        submittedProject: firebase.firestore.FieldValue.arrayRemove(
          objectDelete
        ),
      });
  };

  //----------------------------------------------------------------------------------------------거절

  let getRejectSubmmit = async (projectName, user) => {
    await rejectUserDataApprovedUpdate(projectName, user);
    await deleteSubmmitRejectData(email, user, projectName);
    await delay(1000);
    window.location.reload();
  };

  let rejectUserDataApprovedUpdate = (projectName, user) => {
    firestore
      .collection("users")
      .doc(user)
      .update({
        appliedProject: firebase.firestore.FieldValue.arrayRemove(projectName),
        message: firebase.firestore.FieldValue.arrayUnion(
          `프로젝트 ${projectName}에 참가가 거절 되었습니다`
        ),
      })
      .then(() => {
        return history.push("/mypage/profile");
      });
  };

  let deleteSubmmitRejectData = (host, user, projectName) => {
    let objectDelete = { applicant: user, project: projectName };
    firestore
      .collection("users")
      .doc(host)
      .update({
        submittedProject: firebase.firestore.FieldValue.arrayRemove(
          objectDelete
        ),
      });
  };

  //-----------------------------------------------------------------------------------------------

  return (
    <div className={styles.header}>
      <>
        <div className={styles.table}>
          <div className={styles.title}>
            <li>프로젝트</li>
            <li>신청자</li>
            <li>상태</li>
          </div>
          {submittedProjectData.map((el) => {
            let projectName = Object.keys(el)[0];
            return (
              <div className={styles.tableInt}>
                <div style={{ marginLeft: "2vh" }}>{projectName}</div>
                <div style={{ marginLeft: "3vh" }}>
                  {el[projectName].map((data) => {
                    return <div>{data}</div>;
                  })}
                </div>
                <div className={styles.btn}>
                  {el[projectName].map((data) => {
                    return (
                      <>
                        <div>
                          <button
                            style={{ fontWeight: "bold" }}
                            onClick={() => {
                              getApprovedSubmmit(projectName, data);
                            }}
                          >
                            승인
                          </button>
                          <button
                            style={{ marginLeft: "5px", fontWeight: "bold" }}
                            onClick={() => {
                              getRejectSubmmit(projectName, data);
                            }}
                          >
                            거절
                          </button>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </>
    </div>
  );
});

export default RegistStatus;
