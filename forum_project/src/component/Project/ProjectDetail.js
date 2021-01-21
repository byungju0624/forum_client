import React from "react";
import { useLocation } from "react-router";
import styles from "../../css/Project/ProjectDetail.module.css";
import { useHistory } from "react-router-dom";
const ProjectDetail = () => {
  const location = useLocation();
	console.log('로케이션:', location.state)
  const photo = location.state.photo;
  const name = location.state.name;
  const period = location.state.period;
  const person = location.state.person;
  const lang = location.state.lang;
  const history = useHistory();

  const dataFire = JSON.parse(localStorage.getItem("fireStoreData")).filter((eachData) => {
    if (eachData.name === name) return eachData;
  });
  console.log('파이어베이스 데이터(필터링):', dataFire)
  const term = dataFire[0].term;
  const party = dataFire[0].party;
  const comment = dataFire[0].comment;
  
  return (
    <>
      <div className={styles.projectDetail}>
        <div className={styles.header}>
          <h2>프로젝트명:{name}</h2>
        </div>
        <div className={styles.projectEx}>
          <img src={photo}></img>

          <span className={styles.text}>
            <h3>사용 언어: {lang}</h3>
            <h3>예상기간: {term}</h3>
            <h3>예상인원: {party}</h3>
            <h3>현재지원자:</h3>
          </span>
        </div>
        <div className={styles.explain}>
          <h3>개요: {comment}</h3>
        </div>
        <div className={styles.btn}>
          <span>
            <button>관심 프로젝트 담기</button>
          </span>
          <span>
            <button style={{ marginLeft: "20px" }}>지원하기</button>
          </span>
          <span>
            <button
              style={{ marginLeft: "20px" }}
              onClick={() => history.goBack()}
            >
              취소
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
