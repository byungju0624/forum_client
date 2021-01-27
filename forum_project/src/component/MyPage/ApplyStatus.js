import React from "react";
import styles from "../../css/MyPage/ApplyStatus.module.css";

import { firestore } from "../../firebase";
import auth from "firebase/auth";
import firebase from "firebase/app";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

let appliedData = undefined;
let messageData = undefined;
let name, email, photoUrl, uid, emailVerified;
let host;

const ApplyStatus = (props) => {
	const history = useHistory();
	let appliedData;
  const [appliedProjectData, setAppliedProjectData] = useState([]);
  const [myMessageData, setMyMessageData] = useState([]);

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
    await getMessage(email);
    await delay(1000);
    console.log("등록된 프로젝트", appliedData);
    setAppliedProjectData(appliedData);
		setMyMessageData(messageData);
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


  let getMessage = async (email) => {
    firebase
      .firestore()
      .collection("users")
      .doc(email)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          messageData = doc.data().message;
        } else {
          console.log("문서가 존재하지 않습니다");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
	};
	

	//------------------------------------------------------------------------------------------------------취소하기
	
	let cancelApply = async(projectName, myEmail) => {
		await findHostEmail(projectName)
		await delay(500)
		console.log(host)
		console.log(projectName)
		console.log(myEmail)
		await deleteSubmmitRejectData(host, myEmail, projectName)
		await delay(500)
		await rejectUserDataApprovedUpdate(projectName, myEmail)
	}

	let findHostEmail = async(projectName) => {
		firebase.firestore().collection("project").doc(projectName).get().then(async function (doc){
			if(doc.exists){
				host = await doc.data().host
			}else{
				console.log("문서가 존재하지 않습니다")
			}
		})
	}

	let rejectUserDataApprovedUpdate = (projectName, user) => {
    firestore
      .collection("users")
      .doc(user)
      .update({
        appliedProject: firebase.firestore.FieldValue.arrayRemove(projectName),
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


	//------------------------------------------------------------------------------------------------------


  return (
    <div className={styles.header}>
      <div className={styles.table}>
        <div className={styles.title}>
          <li>프로젝트</li>
          <li>신청현황</li>
          <li>신청취소</li>
        </div>

        {appliedProjectData.map((data) => {
          return (
            <div className={styles.tableInt}>
              <div style={{ width: "50%" }}>
                <div>{data}</div>
              </div>
              <div style={{ width: "50%", marginLeft: "5.5vh" }}>
                <div>승인대기중</div>
              </div>
              <div style={{ width: "50%" }}>
                <button style={{ fontWeight: "bold", marginLeft: "5.5vh" }} onClick={()=>{cancelApply(data, email)}}>
                  취소하기
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        {myMessageData.map((message) => {
          return (
            <div className={styles.messagearea}>
              <div className={styles.message}>{message}.</div>
            </div>
          );
        })}

      </div>
    </div>
  );
  };
export default ApplyStatus;
