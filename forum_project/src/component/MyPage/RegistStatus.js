import React from "react";
import styles from "../../css/MyPage/RegistStatus.module.css";
import Slider from "react-slick";
import firebase from "firebase/app";
const RegistStatus = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrow: true,
    className: "slides",
  };
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
  return (
    <div className={styles.header}>
      <Slider {...settings}>
        {dataFire.map((eachData) => {
          return eachData.host === email ? (
            <>
              <div>
                <img src={eachData.image} className={styles.img}></img>
              </div>
              <div>{eachData.name}</div>
            </>
          ) : (
            <div>등록된 프로젝트가 없습니다.</div>
          );
        })}
      </Slider>
    </div>
  );
};

export default RegistStatus;