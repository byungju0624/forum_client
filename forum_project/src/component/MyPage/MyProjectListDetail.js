import styles from "../../css/MyPage/MyProjectListDetail.module.css";
import { useState, useRef, useCallback } from "react";
import { firestore } from "../../firebase";
import { storage } from "../../firebase";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
function MyProjectListDetail() {
  //넘어온 프로젝트 이름을 통해 데이터베이스에서 검색
  const location = useLocation();
  const projectName = location.state.name;
  let dataFire = JSON.parse(localStorage.getItem("fireStoreData"));
  let projectData = dataFire.filter((el) => {
    if (el.name === projectName) return el;
  });
  console.log("읽어온 현재 프로젝트 데이터", projectData[0]);
  const [comment, setComment] = useState(projectData[0].comment);
  const [host, setHost] = useState("");
  const [party, setParty] = useState(projectData[0].party);
  const [skill, setSkilled] = useState(projectData[0].skill);
  const [term, setTerm] = useState(projectData[0].term);
  const history = useHistory();
  //하나의 기술 문자열을 담기 위한 상태
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
  // let getFirestoreData = async () => {
  //   let eachStore = []
  //   let result = await firestore.collection("project").get().then(function (querySnapshot) {               //result는 await를 하기 위해서 만들어낸 변수
  //     querySnapshot.forEach(async function(doc) {
  //       // doc.data() is never undefined for query doc snapshots
  //       //console.log(doc.id, " => ", doc.data())
  //       console.log("요청하는 이미지는 다음과 같습니다 :" + doc.data().image)
  //       let image = await getFireBaseImage(doc.data().image)
  //       let eachData = {
  //         'comment' : doc.data().comment,
  //         'finish' : doc.data().finish,
  //         'host' : doc.data().host,
  //         'image' : image,
  //         'name' : doc.data().name,
  //         'party' : doc.data().party,
  //         'signed' : doc.data().signed,
  //         'skill' : doc.data().skill,
  //         'term' : doc.data().term
  //       }
  //       eachStore.push(eachData)
  //     });
  //   })
  //   return eachStore
  // }
  let updateDatabase = async () => {
    console.log(
      "수정되는 데이터:",
      "개요:",
      comment,
      "인원:",
      party,
      "스킬:",
      skill,
      "기간",
      term
    );
    console.log("현재 데이터:", projectData[0]);
    firestore
      .collection("project")
      .doc(projectData[0].name)
      .update({
        comment: comment,
        party: party,
        skill: skill,
        term: term,
      })
      .then(function () {
        alert("프로젝트 수정에 성공했습니다");
        console.log(localStorage.fireStoreData);
        history.push("/mypage/myprojectlist");
      })
      .catch(function (error) {
        console.error("다음과 같은 에러가 발생했습니다 : " + error);
      });
  };
  let deleteProjectData = async () => {
    firestore
      .collection("project")
      .doc(projectName)
      .delete()
      .then(() => {
        alert("프로젝트를 성공적으로 삭제했습니다");
        history.push("/mypage/myprojectlist");
      })
      .catch((error) => {
        console.error("다음과 같은 에러가 발생했습니다 : " + error);
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
  return (
    <div className={styles.regist}>
      <div className={styles.projectint}>
        <span>
          <p>프로젝트 이름 :{projectData[0].name}</p>
          <div style={{ marginTop: "10px" }}>
            <img src={projectData[0].image} style={{ width: "40vh" }} />
          </div>
        </span>
        <span>
          <p>
            모집 인원 :{" "}
            <input
              style={{ border: "3px solid black", fontWeight: "bold" }}
              type="number"
              value={party}
              placeholder={projectData[0].party}
              onChange={(e) => setParty(e.target.value)}
            ></input>{" "}
            명
          </p>
          <p>등록 인원 :{projectData[0].signed}명</p>
          <p>
            예상 기간 :{" "}
            <input
              style={{ border: "3px solid black", fontWeight: "bold" }}
              type="date"
              value={term}
              placeholder={projectData[0].term}
              onChange={(e) => setTerm(e.target.value)}
            ></input>
          </p>
          <div>
            사용 언어 :
            <div className={styles.teckstack}>
              <li>
                사용 언어① : <div style={{ width: "50%" }}>{skill[0]}</div>
              </li>
              <li>
                사용 언어② : <div style={{ width: "50%" }}>{skill[1]}</div>
              </li>
              <li>
                사용 언어③ : <div style={{ width: "50%" }}>{skill[2]}</div>
              </li>
            </div>
          </div>
        </span>
      </div>
      <div style={{ marginLeft: "0%", marginTop: "10vh" }}>
        <p>
          프로젝트 개요 :{" "}
          <div style={{ paddingTop: "20px" }}>
            <textarea
              placeholder={projectData[0].comment}
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{
                width: "50vh",
                height: "15vh",
                border: "3px solid black",
                fontWeight: "bold",
              }}
            ></textarea>
          </div>
        </p>
      </div>
      <div className={styles.registbtn}>
        <span>
          <button onClick={updateDatabase}>수정하기</button>
        </span>
        <span style={{ paddingLeft: "6vh" }}>
          <button onClick={deleteProjectData}>삭제하기</button>
        </span>
      </div>
    </div>
  );
}
export default MyProjectListDetail;
