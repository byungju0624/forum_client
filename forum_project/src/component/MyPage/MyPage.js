import styles from '../../css/MyPage/MyPage.module.css';
import React from 'react'
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Profile from './Profile'
import ProjectList from './ProjectList'
import Registed from './Registed'
import Submitted from './Submitted'

function MyPage() {
  return (
    <div className={styles.container}>
    <div className={styles.sidemenu}>
      <Router>
        <Link to="/mypage/profile">
        <div>프로필</div>
        </Link>
        <Link to="/mypage/list">
        <div>위시리스트</div>
        </Link>
        <Link to="/mypage/registed">
        <div>등록현황</div>
        </Link>
        <Link to="/mypage/submitted">
        <div>신청현황</div>
        </Link>
    <Switch>
    <Route exact path="/mypage/profile"><Profile /></Route>
    <Route exact path="/mypage/list" component={ProjectList} />
    <Route exact path="/mypage/registed" component={Registed} />
    <Route exact path="/mypage/submitted" component={Submitted} />
  </Switch>
      </Router>
      </div>
    </div>
  );
}

export default MyPage;