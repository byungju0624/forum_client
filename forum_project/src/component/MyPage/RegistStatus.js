import React from "react";
import styles from "../../css/MyPage/RegistStatus.module.css";
import Slider from "react-slick";
import firebase from "firebase/app";

const RegistStatus = (props) => { 
 let user = firebase.auth().currentUser; 
 let name, email, photoUrl, uid, emailVerified; 

 if(user != null) {
   name = user.displayName;
   email = user.email;
   photoUrl = user.photoURL;
   emailVerified = user.emailVerified; 
   uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
   // this value to authenticate with your backend server, if
   // you have one. Use User.getToken() instead.
 }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrow: true,
    className: "slides",
  };
  return (
    <div className={styles.header}>
      <Slider {...settings}>
        <div>등록1</div>
        <div>등록2</div>
        <div>등록3</div>
        <div>등록4</div>
        <div>등록5</div>
      </Slider>
    </div>
  );
};

export default RegistStatus;