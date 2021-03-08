import React from "react";
import styles from "../../css/MyPage/Profile.module.css";
import firebase from "firebase/app";
import { memo } from "react";

const Profile = memo((props) => {
  let user = firebase.auth().currentUser;
  let name, email, photoUrl, uid, emailVerified;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
  }
  return (
    <div className={styles.header}>
      <div>
        <img src={photoUrl} style={{ borderRadius: "50px" }}></img>
      </div>
      <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        {name} 님, 환영합니다.
      </div>
      <div>이메일: {email}</div>
    </div>
  );
});

export default Profile;
