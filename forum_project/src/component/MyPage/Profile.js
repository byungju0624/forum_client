import React from "react"; 
import styles from "../../css/MyPage/Profile.module.css"; 
import firebase from "firebase/app";
import auth from "firebase/auth";          
//import { firestore } from "../firebase";

const Profile = (props) => {
  let user = firebase.auth().currentUser;
  let name, email, photoUrl, uid, emailVerified;
  
  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                     // this value to authenticate with your backend server, if
                     // you have one. Use User.getToken() instead.
 }

  return ( <div className={styles.header}>
    <div>
      <img src={photoUrl} style={{ borderRadius: "50px" }}></img>
    </div>
    <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
      {name} 님, 환영합니다.
    </div>
    <div>이메일: {email}</div>
  </div>
  )
}


export default Profile;