import React from "react";
import styles from "../../css/MyPage/WishList.module.css";

const WishList = (props) => {

  let dataFire = JSON.parse(localStorage.getItem("fireStoreData"))

  return (
    <div className={styles.header}> 
      <div>내가 등록한 프로젝트</div>
      
      </div>
  );
};

export default WishList;
