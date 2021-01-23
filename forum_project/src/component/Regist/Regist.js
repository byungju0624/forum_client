import styles from "../../css/Regist/Regist.module.css";
import { useState, useRef, useCallback } from "react";
import { firestore } from "../../firebase";
import { storage } from "../../firebase";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";

function Regist() {
  const [comment, setComment] = useState("");
  const [finish, setFinish] = useState(false);
  const [host, setHost] = useState("");
  const [name, setName] = useState("");
  const [party, setParty] = useState(0);
  const [signed, setSigned] = useState(0);
  const [skill, setSkilled] = useState([]);
  const [term, setTerm] = useState("");
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

  function delay(ms) {
    return new Promise((resolve, reject) => {
      //promise 객체 반환, async도 promise를 다루는 기술이란 것을 잊지 말것
      setTimeout(resolve, ms);
    });
  }

  let createDatabase = async () => {
    let result = await handleFireBaseUpload(); //여기서 일단 이미지를 올린다.
    await delay(2500);
    if (result === false) {
      //2차 안전장치
      console.log("이미지를 올리지 않아서 아무 일도 안생길 거임");
    } else if (!comment || finish || !name || !party || !eachSkill) {
      alert("모든 항목은 필수입니다");
      window.location.reload();
    } else {
      firestore
        .collection("project")
        .doc(name)
        .get()
        .then(function (docName) {
          if (docName.data() !== undefined) {
            alert("중복된 프로젝트명입니다. 다른 프로젝트 이름을 정해주세요");
            window.location.reload();
          } else if (name + ".png" !== imageAsFile.name) {
            alert("프로젝트 이름과 이미지 파일은 이름이 같아야 합니다.");
            window.location.reload();
          } else {
            firestore
              .collection("project")
              .doc(name)
              .set({
                host: host,
                comment: comment,
                finish: finish,
                name: name,
                party: party,
                signed: signed,
                skill: skill,
                term: term,
                image: imageAsFile.name,
              })
              .then(function () {
                alert("프로젝트 등록에 성공했습니다");
                window.location.reload();
              })
              .catch(function (error) {
                console.error("다음과 같은 에러가 발생했습니다 : " + error);
              });
          }
        });
    }
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

  let handleFireBaseUpload = (e) => {
    if (imageAsFile === "") {
      alert(`이미지 파일을 올려 주세요!!!`);
      return false;
    } else {
      console.log("이미지 업로드를 시작합니다");
      console.log("사진이름이 뭔지 확인해볼거야" + imageAsFile.name);
      const uploadTask = storage
        .ref(`/project/${imageAsFile.name}`)
        .put(imageAsFile);
      uploadTask.on(
        "state_changed",
        (snapShot) => {
          console.log(snapShot);
        },
        (err) => {
          console.log(err);
        },
        () => {
          storage
            .ref("project")
            .child(imageAsFile.name)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              setImageAsUrl((prevObject) => ({
                ...prevObject,
                imgUrl: fireBaseUrl,
              }));
              console.log("유알엘이 뭔지 확인해볼거야" + fireBaseUrl);
              console.log("사진이름이 뭔지 확인해볼거야" + imageAsFile.name);
              firestore
                .collection("project")
                .doc(imageAsFile.name)
                .update({
                  image: fireBaseUrl,
                })
                .then(function () {
                  console.log(
                    "파이어베이스 업데이트 완료 이미지 url 파이어스토어에 업로드"
                  );
                })
                .catch(function (err) {
                  //alert(err)
                });
            });
        }
      );
      return true;
    }
  };

  return (
    <div className={styles.regist}>
      <div className={styles.projectint}>
        <span>
          <p>
            프로젝트 이름 :{" "}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </p>
          <div>
            <form onSubmit={handleFireBaseUpload}>
              <input
                type="file"
                accept="image/png"
                onChange={handleImageAsFile}
              />
            </form>
          </div>
          <div style={{ marginTop: "10px" }}>
            {imageAsFile !== "" ? (
              <img src={imageAsUrl} style={{ width: "50%" }} />
            ) : (
              <span>
                png 파일을 선택해주세요. <br />
                파일의 이름은 프로젝트의 이름과 동일해야 합니다.
              </span>
            )}
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
          <button onClick={createDatabase}>등록하기</button>
        </span>
        <span style={{ paddingLeft: "20px" }}>
          <button onClick={() => history.push("/")}>취소</button>
        </span>
      </div>
    </div>
  );
}

export default Regist;