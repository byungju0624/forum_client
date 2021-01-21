import React from "react";
import styles from "../../css/MyPage/WishList.module.css";
import Slider from "react-slick";
import firebase from "firebase/app";
const WishList = (props) => {
  let dataFire = JSON.parse(localStorage.getItem("fireStoreData"));
  //로그인 정보 가져오기
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

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   slidesToShow: 3,
  //   slidesToScroll: 3,
  //   arrow: true,
  //   className: "slides",
  // };
  return (
    <div className={styles.header}>
      <div>등록 프로젝트</div>
      <div className={styles.registlist}>
        {dataFire.map((data) => {
          if (data.host === email) {
            return (
              <div>
                <img
                  src={data.image}
                  style={{ width: "20vh", height: "20vh" }}
                ></img>
              </div>
            );
          } else {
            return <div>등록된 프로젝트가 없습니다.</div>;
          }
        })}
      </div>
      <div>참가 프로젝트</div>
      <div className={styles.attendlist}>프로젝트 리스트</div>
      {/* <Slider {...settings}>
        <div>위시리스트1</div>
        <div>위시리스트2</div>
        <div>위시리스트3</div>
        <div>위시리스트4</div>
        <div>위시리스트5</div>
      </Slider> */}
    </div>
  );
};

export default WishList;
