import styles from "../../css/MyPage/MyPage.module.css";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Profile from "./Profile";
import WishList from "./WishList";
import RegistStatus from "./RegistStatus";
import ApplyStatus from "./ApplyStatus";
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
            to="/mypage/wishlist"
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
              진행 중인 프로젝트 리스트
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
        </div>
        <Switch>
          <Route exact path="/mypage/profile" component={Profile} />
          <Route exact path="/mypage/wishlist" component={WishList} />
          <Route exact path="/mypage/registstatus" component={RegistStatus} />
          <Route exact path="/mypage/applystatus" component={ApplyStatus} />
        </Switch>
      </Router>
    </div>
  );
}

export default MyPage;
