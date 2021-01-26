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
            <img src={projectData[0].image} style={{ width: "50%" }} />
          </div>
        </span>

        <span>
          <p>
            모집인원 :{projectData[0].party}
            <input
              type="number"
              value={party}
              onChange={(e) => setParty(e.target.value)}
            ></input>
          </p>
          <p>현재 등록 인원 :{projectData[0].signed}</p>
          <p>
            프로젝트 기간 :{projectData[0].term}
            <input
              type="date"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            ></input>
          </p>

          <div>
            기술 스택 :
            {projectData[0].skill.map((el, idx) => {
              return (
                <div>
                  <div className={styles.skill}>{el}</div>
                  <input
                    type="text"
                    value={eachSkill}
                    onChange={(e) => setEachSkill(e.target.value)}
                  ></input>
                  <button>변경</button>
                </div>
              );
            })}
            <input
              type="text"
              value={eachSkill}
              onChange={(e) => setEachSkill(e.target.value)}
            ></input>
            <button onClick={skillbutton}>추가</button>
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
        프로젝트 개요 :{projectData[0].comment}
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
          <button onClick={updateDatabase}>수정하기</button>
        </span>
        <span style={{ paddingLeft: "20px" }}>
          <button onClick={deleteProjectData}>삭제</button>
        </span>
      </div>
    </div>
  );
}

export default MyProjectListDetail;
