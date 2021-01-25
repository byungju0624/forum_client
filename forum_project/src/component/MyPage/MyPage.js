import styles from "../../css/MyPage/MyPage.module.css";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Profile from "./Profile";
import MyProjectList from "./MyProjectList";
import RegistStatus from "./RegistStatus";
import ApplyStatus from "./ApplyStatus";
import MyProjectListDetail from "./MyProjectListDetail";

function MyPage() {



  return (
    <div className={styles.header}>
      <Router>
        <div className={styles.sidebar}>
          <Link
            to="/mypage/profile"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div>프로필</div>
          </Link>
          <Link
            to="/mypage/myprojectlist"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <div
              style={{
                paddingTop: "25%",
              }}
            >
              나의 프로젝트
            </div>
          </Link>
          <Link
            to="/mypage/registstatus"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div
              style={{
                paddingTop: "25%",
              }}
            >
              등록현황
            </div>
          </Link>
          <Link
            to="/mypage/applystatus"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div
              style={{
                paddingTop: "25%",
              }}
            >
              신청현황
            </div>
          </Link>
          <Link to='/mypage/myprojectlistdetail'></Link>
        </div>
        <Switch>
          <Route exact path="/mypage/profile" component={Profile} />
          <Route exact path="/mypage/myprojectlist" component={MyProjectList} />
          <Route exact path="/mypage/registstatus" component={RegistStatus} />
          <Route exact path="/mypage/applystatus" component={ApplyStatus} />
          <Route exact Path="/mypage/myprojectlistdetail" component={MyProjectListDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default MyPage;
