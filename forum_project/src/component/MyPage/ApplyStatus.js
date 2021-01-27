import React from "react";
import styles from "../../css/MyPage/ApplyStatus.module.css";
import firebase from "firebase/app";
import { firestore } from "../../firebase";
import { useEffect } from "react";
import { useState } from "react";


const ApplyStatus = (props) => {

 
  



  return (
    <div className={styles.header}>
      <div className={styles.table}>
        <div className={styles.title}>
          <li>프로젝트</li>
          <li>신청현황</li>
          <li>신청취소</li>
        </div>
      </div>
    </div>
  );
  };
export default ApplyStatus;
