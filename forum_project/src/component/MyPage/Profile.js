import React from 'react';
import styles from '../../css/MyPage/Profile.module.css';
import firebase from "firebase/app";

const Profile = () => {
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
        <div>
            <img src={photoUrl} />
        <div>{name}</div>
        <div>{email}</div>
        </div>
    )
};

export default Profile;