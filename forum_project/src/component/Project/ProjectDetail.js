import React from "react";
import { useLocation } from "react-router";
import styles from "../../css/Project/ProjectDetail.module.css";
const ProjectDetail = (props) => {
  const location = useLocation();
  const photo = location.state.photos;
  const name = location.state.name;
  console.log(name);
  return (
    <>
      <div className={styles.projectDetail}>
        <h2>프로젝트명:{name}</h2>
        <div className={styles.projectEx}>
          <img src={photo}></img>

          <span className={styles.text}>
            <h3>태그:</h3>
            <h3>예상기간:</h3>
            <h3>예상인원:</h3>
            <h3>현재지원자:</h3>
          </span>
        </div>
        <div>
          <h3>개요:</h3>
        </div>
        <span>
          <button>관심 프로젝트 담기</button>
        </span>
        <span>
          <button>지원하기</button>
        </span>
      </div>
    </>
  );
};

export default ProjectDetail;
