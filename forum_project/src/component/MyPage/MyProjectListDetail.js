import styles from "../../css/MyPage/MyProjectListDetail.module.css";
import { useState, useRef, useCallback } from "react";
import { firestore } from "../../firebase";
import { storage } from "../../firebase";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

function MyProjectListDetail() {
  const [comment, setComment] = useState("");
  const [finish, setFinish] = useState(false);
  const [host, setHost] = useState("");
  const [name, setName] = useState("");
  const [party, setParty] = useState(0);
  const [signed, setSigned] = useState(0);
  const [skill, setSkilled] = useState([]);
  const [term, setTerm] = useState("");
  const history = useHistory();
  const location = useLocation();
  //하나의 기술 문자열을 담기 위한 샅애
  const [eachSkill, setEachSkill] = useState("");

  //이미지를 업로드 하기 위한 상태들
  let allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      //console.log(user.displayName);
      //console.log(user.email);
      setHost(user.email);
    } else {
      console.log("유저 없는 뎁쇼");
    }
  });

  function delay(ms) {
    return new Promise((resolve, reject) => {
      //promise 객체 반환, async도 promise를 다루는 기술이란 것을 잊지 말것
      setTimeout(resolve, ms);
    });
  }
  const projectName = location.state.name;
  const dataFire = JSON.parse(localStorage.getItem("fireStoreData"));
  let projectData = dataFire.filter((el) => {
    if (el.name === projectName) return el;
  });
  console.log("프로젝트 데이터:", projectData);
  console.log(
    "프로젝트 이름:",
    projectData[0].name,
    "프로젝트 이미지:",
    projectData[0].image
  );
  let modifiedDatabase = async () => {
    console.log(dataFire);
    firestore
      .collection("project")
      .doc(projectData[0].name)
      .get()
      .then(function (docName) {
        firestore
          .collection("project")
          .doc(projectData[0].name)
          .update({
            comment: comment,
            finish: finish,
            party: party,
            signed: signed,
            skill: skill,
            term: term,
          })
          .then(function () {
            alert("프로젝트 수정되었습니다.");
            window.location.reload();
          })

          .catch(function (error) {
            console.error("다음과 같은 에러가 발생했습니다 : " + error);
          });
      });
  };

  let skillbutton = () => {
    if (skill.length > 2) {
      alert("기술 스택은 3개까지만 넣을 수 있어용~");
    } else {
      if (skill.includes(eachSkill.toLowerCase()) === false) {
        setSkilled(skill.concat(eachSkill.toLowerCase()));
      } else {
        alert("중복된 기술이에용~");
      }
    }
  };

  let handleImageAsFile = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const image = e.target.files[0];
    reader.onloadend = () => {
      setImageAsFile(image);
      setImageAsUrl(reader.result);
    };
    reader.readAsDataURL(image);
  };

  //넘어온 프로젝트 이름을 통해 데이터베이스에서 검색

  return (
    <div className={styles.regist}>
      <div className={styles.projectint}>
        <span>
          <p>프로젝트 이름 :{projectData[0].name}</p>

          <div style={{ marginTop: "10px" }}>
            <img src={projectData[0].image} style={{ width: "50%" }} />
          </div>
        </span>

        <span>
          <p>
            모집인원 :{" "}
            <input
              type="number"
              value={party}
              onChange={(e) => setParty(e.target.value)}
            ></input>
          </p>
          <p>
            현재 등록 인원 :{" "}
            <input
              type="number"
              value={signed}
              onChange={(e) => setSigned(e.target.value)}
            ></input>
          </p>
          <p>
            프로젝트 기간 :{" "}
            <input
              type="date"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            ></input>
          </p>

          <div>
            기술 스택 :{" "}
            <input
              type="text"
              value={eachSkill}
              onChange={(e) => setEachSkill(e.target.value)}
            ></input>
            <button onClick={skillbutton}>클릭</button>
            <div className={styles.teckstack}>
              <li>
                기술스택1 : <div style={{ width: "50%" }}>{skill[0]}</div>
              </li>
              <li>
                기술스택2 : <div style={{ width: "50%" }}>{skill[1]}</div>
              </li>
              <li>
                기술스택3 : <div style={{ width: "50%" }}>{skill[2]}</div>
              </li>
            </div>
          </div>
        </span>
      </div>

      <p>
        프로젝트 개요 :{" "}
        <div style={{ paddingTop: "20px" }}>
          <textarea
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ width: "50vh", height: "15vh" }}
          ></textarea>
        </div>
      </p>
      <div className={styles.registbtn}>
        <span>
          <button onClick={modifiedDatabase}>수정하기</button>
        </span>
        <span style={{ paddingLeft: "20px" }}>
          <button onClick={() => history.push("/mypage/myprojectlist")}>
            취소
          </button>
        </span>
      </div>
    </div>
  );
}

export default MyProjectListDetail;
