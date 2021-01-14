import React from "react"; 
import { useLocation } from "react-router"; 
import styles from  '../../css/Project/ProjectDetail.module.css'

const ProjectDetail = (props) => {
  const location = useLocation(); 
  const photos = location.state.photos; 
  const name = location.state.name; 


 return (
  <>
   <div className = {styles.ProjectDetail}>
    <h2> 프로젝트명: {name} </h2> 

    <div className = {styles.ProjectExplain}>
    <img src = {photos}></img> 
    <span className = {styles.text}>
      <h3>예상기간</h3> 
      <h3>예상인원</h3>
      <h3>현재지원자</h3>
     </span>
     </div>
     </div>
     </>
 )
}

export default ProjectDetail; 