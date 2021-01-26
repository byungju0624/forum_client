import React from "react";
import styles from "../../css/MyPage/MyProjectList.module.css";
import firebase from "firebase/app";
import auth from "firebase/auth";
import { useHistory } from "react-router-dom";
// import Slider from "react-slick";

const MyProjectList = (props) => {
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   slidesToShow: 3,
  //   slidesToScroll: 3,
  //   arrow: true,
  //   className: "slides",
  // };
  const history = useHistory();
  let user = firebase.auth().currentUser;
  let name, email, photoUrl, uid, emailVerified;
  console.log('유저 정보', user)
  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
  }

  let dataFire = JSON.parse(localStorage.getItem("fireStoreData"))
  let myRegistedProject = dataFire.filter((el) => {
    if (el.host === email) return el;
  })
  console.log('파이어베이스 데이터(전체):', dataFire);

  let joinProject = ['test4', 'test2'];
  let myJoinedProject = dataFire.filter((el) => {
    for (let i = 0; i < joinProject.length; i++) {
      if (el.name === joinProject[i]) return el;
    }
  })
  console.log('myJoinedProject:', myJoinedProject)

  // for (let i = 0; i < joinProject.length; i++) {
  //   let temp = dataFire.filter((el) => {
  //     if (el.name === joinProject[i]) return el;
  //   })
  //   console.log('temp 값:', temp)
  //   myJoinedProject.push(temp)
  //   console.log('myJoinedProject:', myJoinedProject)
  // }

  let photo = null;
  let projectName = null;
  let period = null;
  let person = null;
  let lang = null;

  let handleClick = (e) => {
    console.log('e.target:', e.target)
    photo = e.target.src;
    projectName = e.target.name;
    period = e.target.period;
    person = e.target.person;
    lang = e.target.lang;
    console.log('이미지:', photo, '이름:', projectName, '기간:', period, '인원:', person, '스킬', lang)
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
      {/* <Slider {...settings}>
        <div>위시리스트1</div>
        <div>위시리스트2</div>
        <div>위시리스트3</div>
        <div>위시리스트4</div>
        <div>위시리스트5</div>
      </Slider> */}
      <h3>내가 등록한 프로젝트</h3>
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
              <li>프로젝트 이름:{eachData.name}</li>
              <li>예상 기간: {eachData.term}</li>
              <li>현재 인원: {eachData.party}</li>
              <li>사용 언어: {eachData.skill.map((el) => {
                return <span className={styles.skill}>{el}</span>
              })}</li>
            </ul>
          </div>
        );
      })}
      </div>

        <h3>내가 참가 중인 프로젝트</h3>
        <div className={styles.secondContainer}>
      {myJoinedProject.map((eachData) => {
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
              <li>사용 언어: {eachData.skill}</li>
            </ul>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default MyProjectList;
