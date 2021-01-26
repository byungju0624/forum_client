import React from "react";
import styles from "../../css/MyPage/RegistStatus.module.css";
import Slider from "react-slick";
import firebase from "firebase/app";
import { firestore } from "../../firebase";

const RegistStatus = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrow: true,
    className: "slides",
  };

  //submittedProject : 내가 등록을 했는데(내가 호스트인데) 신청이 들어온 프로젝트
  //[ {프로젝트명: [신청자1, 신청자2,...} ]
  let submittedProject = [
    { projectTest: ["chejg7@gmail.com", "yanda20201@gmail.com"] },
  ];

  let user = firebase.auth().currentUser;
  let name, email, photoUrl, uid, emailVerified;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
  }
  const dataFire = JSON.parse(localStorage.getItem("fireStoreData")); //
  //.filter
  //   (eachData) => {
  //     console.log(eachData.host);
  //     if (eachData.host === email) {
  //       return eachData;
  //     } else {
  //       alert("등록된 프로젝트가 없습니다.");
  //     }
  //   }

  const handleApprove = (e) => {
    let userEmail = e.target.value;
    //유저데이터
    let userData = firestore
      .collection("users")
      .doc(userEmail)
      .update({
        joinProject: [userEmail],
      });
  };

  const handleReject = () => {};

  return (
    <div className={styles.header}>
      {submittedProject.map((el) => {
        let projectName = Object.keys(el)[0];
        return (
          <>
            <div className={styles.table}>
              <div className={styles.title}>
                <li>프로젝트</li>
                <li>신청자</li>
                <li>상태</li>
              </div>
              <div className={styles.tableInt}>
                <div style={{ marginLeft: "3vh" }}>{projectName}</div>
                <div style={{ width: "30%" }}>
                  {el[projectName].map((data) => {
                    return <div>{data}</div>;
                  })}
                </div>
                <div className={styles.btn}>
                  {el[projectName].map((data) => {
                    return (
                      <frameElement>
                        <div>
                          <button style={{ fontWeight: "bold" }}>승인</button>

                          <button
                            style={{ marginLeft: "5px", fontWeight: "bold" }}
                          >
                            거절
                          </button>
                        </div>
                      </frameElement>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default RegistStatus;
