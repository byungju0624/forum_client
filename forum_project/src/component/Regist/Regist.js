import styles from "../../css/Regist/Regist.module.css";
import { useState, memo } from "react";
import { firestore } from "../../firebase";
import { storage } from "../../firebase";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";

const Regist = memo(() => {
  const [comment, setComment] = useState("");
  const [finish, setFinish] = useState(false);
  const [host, setHost] = useState("");
  const [name, setName] = useState("");
  const [party, setParty] = useState(0);
  const [signed, setSigned] = useState(1);
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
    let result = handleFireBaseUpload(); //여기서 일단 이미지를 올린다.
    await delay(2500);
    if (result === false) {
      //2차 안전장치
    } else if (!comment || finish || !name || !party || !eachSkill) {
      alert("모든 항목은 필수입니다");
      window.location.reload();
    } else {
      await howManyRegist(host);
      await firestore
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
                people: [host],
              })
              .then(async function () {
                await addAppliedProject(host, name);
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
  let enterPress = (e) => {
    if (e.key === "Enter") {
      skillbutton();
    }
  };

  let skillbutton = (e) => {
    if (skill.length > 2) {
      alert("기술 스택은 3개까지만 넣을 수 있습니다.");
    } else {
      if (skill.includes(eachSkill.toLowerCase()) === false) {
        setSkilled(skill.concat(eachSkill.toLowerCase()));
      } else {
        alert("중복된 기술입니다.");
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

  let howManyRegist = async (host) => {
    await firestore
      .collection("users")
      .doc(host)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          let document = doc.data();
          if (document.hostProject.length > 2) {
            alert(
              "프로젝트를 3개 이상 등록하실려면 프라이빗 계정으로 전환하세요."
            );
            window.location.reload();
          } else {
            console.log("참");
          }
        } else {
          console.log("문서가 존재하지 않습니다");
        }
      })
      .catch(function (error) {
        console.log("에러는 다음과 같음" + error);
      });
    console.log("-------------------------------------");
  };

  let addAppliedProject = async (host, name) => {
    firestore
      .collection("users")
      .doc(host)
      .update({
        hostProject: firebase.firestore.FieldValue.arrayUnion(name), //파이어스토어 배열 건드릴 때에는 절대 세미콜론 넣지마!!!
      })
      .then(function () {
        console.log("유저 정보에도 자기가 등록한 프로젝트가 들어갔나요?");
      })
      .catch(function (err) {
        console.log("발생한 에러는 다음과 같습니다" + err);
      });
  };

  return (
    <div className={styles.regist}>
      <div className={styles.projectint}>
        <span>
          <div>
            프로젝트 이름 :{" "}
            <input
              style={{ border: "3px solid black", fontWeight: "bold" }}
              type="text"
              value={name}
              placeholder="파일이름과 같아야합니다."
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <form onSubmit={handleFireBaseUpload} className={styles.img}>
              <input
                type="file"
                accept="image/png"
                onChange={handleImageAsFile}
                style={{ fontWeight: "bold" }}
              />
            </form>
          </div>
          <div style={{ marginTop: "10px" }}>
            {imageAsFile !== "" ? (
              <img src={imageAsUrl} style={{ width: "40vh" }} />
            ) : (
              <span>
                png 파일을 선택해주세요. <br />
                파일의 이름은 프로젝트의 이름과 동일해야 합니다.
              </span>
            )}
          </div>
        </span>
        <span>
          <div>
            모집 인원 :{" "}
            <input
              style={{ border: "3px solid black", fontWeight: "bold" }}
              type="number"
              value={party}
              onChange={(e) => setParty(e.target.value)}
            ></input>{" "}
            명
          </div>

          <div className={styles.date}>
            예상 기간 :{" "}
            <input
              style={{ border: "3px solid black", fontWeight: "bold" }}
              type="date"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            ></input>
          </div>

          <div className={styles.lang}>
            사용 언어 :{" "}
            <input
              style={{ border: "3px solid black" }}
              type="text"
              placeholder="한가지씩 작성해 주세요."
              value={eachSkill}
              onKeyPress={enterPress}
              onChange={(e) => setEachSkill(e.target.value)}
            ></input>
            <button
              style={{
                marginLeft: "5px",
                border: "3px solid black",
                fontWeight: "bold",
              }}
              onClick={skillbutton}
            >
              클릭
            </button>
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

      <div style={{ marginLeft: "12%", marginTop: "10vh" }}>
        <div className={styles.explain}>
          프로젝트 개요 :{" "}
          <div style={{ paddingTop: "20px" }}>
            <textarea
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{
                width: "80%",
                height: "15vh",
                border: "3px solid black",
                fontWeight: "bold",
              }}
            ></textarea>
          </div>
        </div>
      </div>
      <div className={styles.registbtn}>
        <span>
          <button onClick={createDatabase}>등록하기</button>
        </span>
        <span style={{ paddingLeft: "6vh" }}>
          <button onClick={() => history.push("/")}>취소하기</button>
        </span>
      </div>
    </div>
  );
});

export default Regist;
