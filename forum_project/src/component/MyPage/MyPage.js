import styles from "../../css/MyPage/MyPage.module.css";  
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import React from "react";
import { useState } from "react";

import Profile from "../MyPage/Profile"
import Wishlist from "../MyPage/Wishlist";
import RegistStatus from "../MyPage/RegistStatus";
import ApplyStatus from "../MyPage/ApplyStatus";


function MyPage() {



  return (
  <div className={styles.header}>
   <Router> 
     <div className={styles.sidebar}>
   
     <Link to="/mypage/profile" style={{textDecoration: "none", color: "black"}}><div className = {styles.profile}>프로필</div></Link>
     <Link to="/mypage/wishlist" style={{textDecoration: "none", color: "black"}}><div className = {styles.wishlist}>위시리스트</div></Link>
     <Link to="/mypage/registstatus" style={{textDecoration: "none", color: "black"}}> <div className = {styles.registstatus}>등록현황</div></Link>
     <Link to="/mypage/applystatus" style={{textDecoration: "none", color: "black"}}><div className = {styles.applystatus}>신청현황</div></Link>
     </div>
        <Switch>
          <Route exact path="/mypage/profile" component={Profile} />
          <Route exact path="/mypage/wishlist" component={Wishlist} />
          <Route exact path="/mypage/registstatus" component={RegistStatus} />
          <Route exact path="/mypage/applystatus" component={ApplyStatus} />
        </Switch>   
  </Router>
  </div>
 
  );
}

export default MyPage;



