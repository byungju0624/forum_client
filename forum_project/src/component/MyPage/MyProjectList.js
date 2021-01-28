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

  //--------------------------------------------------------

  let hostProjectData, joinedProjectData, myRegistedProjectData, myJoinedProjectData;

  // const [myRegisted, setMyRegisted] = useState([]);
  // const [myJoined, setMyJoined] = useState([]);
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
    //console.log(JSON.stringify(submittedData))
    // await setMyRegisted(hostProjectData);
    // await setMyJoined(joinedProjectData);
    
    // console.log('내가 참가한 프로젝트:', myJoinedProject);
    // await getMyRegistedProject(myRegisted);
    // await getMyJoinedProject(myJoined);
    // await setMyRegistedProject(myRegistedProjectData);
    // await setMyJoinedProject(myJoinedProjectData);
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
          // setMyRegisted(hostProjectData);
          console.log('hostProjectData:', hostProjectData)
          console.log('내가 등록한 프로젝트:', myRegistedProject);
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
          getMyJoinedProject(joinedProjectData)
          console.log('joinedProjectData:', joinedProjectData)
          console.log('내가 참가한 프로젝트:', myJoinedProject);
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
      firebase.firestore().collection('project').doc(el).get().then((doc) => {
        let docData = doc.data();
        let imageUrl = getFireBaseImage(docData.image).then((url) => {
          docData.image = url
        })

        console.log('다시 docData:', docData)
        myRegisted.push(docData);
      })
    })
    // for (let i = 0; i < arr.length; i++) {
    //   firebase.firestore().collection('project').doc(arr[i]).get().then((doc) => {
    //     myRegistedProjectData.push(doc.data())
    //   })
    // }
    // console.log('나의 등록 프로젝트 데이터:', myRegistedProject)
  }

  let getMyJoinedProject = async (data) => {
    data.map((el) => {
      firebase.firestore().collection('project').doc(el).get().then((doc) => {
        let docData = doc.data();
        getFireBaseImage(docData.image).then((url) => {
          docData.image = url
          console.log('참가 프로젝트 데이터, 다시 docData:', docData);
        })
        myJoined.push(docData);
      })
    })
  }
//---------------------------------------------------------

  // let dataFire = JSON.parse(localStorage.getItem("fireStoreData"));
  // let myRegistedProject = dataFire.filter((el) => {
  //   if (el.host === email) return el;
  // });
  // console.log("파이어베이스 데이터(전체):", dataFire);

  // let joinProject = ["test4", "test2"];
  // let myJoinedProject = dataFire.filter((el) => {
  //   console.log("data:", el);
  //   for (let i = 0; i < joinProject.length; i++) {
  //     if (el.name === joinProject[i]) return el;
  //   }
  // });
  // console.log("myJoinedProject:", myJoinedProject);

  // for (let i = 0; i < joinProject.length; i++) {
  //   let temp = dataFire.filter((el) => {
  //     if (el.name === joinProject[i]) return el;
  //   })
  //   console.log('temp 값:', temp)
  //   myJoinedProject.push(temp)
  //   console.log('myJoinedProject:', myJoinedProject)
  // }

  let getFireBaseImage = async (image) => {
		return storage.ref('project').child(image).getDownloadURL().then((url) => {
			return url
		}).catch((error) => {
			console.log('이미지를 받아오지 못했습니다.'+error)
		})
	}

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
          console.log('리턴의 참가 프로젝트:', eachData);
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
                <li>사용언어 :{" "}
                  {eachData.skill.map((el) => {
                    return <span className={styles.skill}>{el}</span>;
                  })}</li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyProjectList;
