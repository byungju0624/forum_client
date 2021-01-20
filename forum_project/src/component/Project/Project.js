import styles from "../../css/Project/Project.module.css";
import { withRouter, Link } from "react-router-dom";
import Slider from "react-slick";
import firebase from "firebase/app";
import { firestore } from "../../firebase";
import { storage } from "../../firebase";
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

let photo = null;
let name = null;
let period = null;
let person = null;
let lang = null;

let fireData = [];

function Project(props) {
  //const [fireData, setFireData] = useState([]);

  function delay(ms) {
    return new Promise((resolve, reject) => {
      //promise 객체 반환, async도 promise를 다루는 기술이란 것을 잊지 말것
      setTimeout(resolve, ms);
    });
  }

  let getFireBaseImage = (image) => {
    return storage
      .ref("project")
      .child(image)
      .getDownloadURL()
      .then((url) => {
        return url;
      })
      .catch((error) => {
        console.log("이미지를 받아오지 못했습니다." + error);
      });
  };

  useEffect(async () => {
    if (fireData.length === 0) {
      delay(2000);
      console.log(
        "왜 명령어가 먹히지 않을까. 배열의 길이는 다음과 같다 : " +
          fireData.length
      );
      await getFirestoreData();
      testTwice();
      let set = new Set(fireData);
      let newData = [...set];
      console.log(newData);
    }
  });

  let testTwice = () => {
    console.log("------------------두 번씩 나오는 것 체크------------------");
  };

  let getFirestoreData = async () => {
    let result = await firestore
      .collection("project")
      .get()
      .then(function (querySnapshot) {
        //result는 await를 하기 위해서 만들어낸 변수
        querySnapshot.forEach(async function (doc) {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data())
          console.log("요청하는 이미지는 다음과 같습니다 :" + doc.data().image);
          let image = await getFireBaseImage(doc.data().image);
          let eachData = {
            comment: doc.data().comment,
            finish: doc.data().finish,
            host: doc.data().host,
            image: image,
            name: doc.data().name,
            party: doc.data().party,
            signed: doc.data().signed,
            skill: doc.data().skill,
            term: doc.data().term,
          };
          fireData.push(eachData);
        });
      });
  };
  const history = useHistory();
  let handleClick = (e) => {
    photo = e.target.src;
    name = e.target.name;
    period = e.target.period;
    person = e.target.person;
    lang = e.target.lang;
    history.push({
      pathname: "/projectdetail",
      state: {
        photo: photo,
        name: name,
        period: period,
        person: person,
        lang: lang,
      },
    });
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrow: true,
    className: "slides",
  };

  return (
    <div className={styles.project}>
      <h2>프로젝트 열람</h2>
      <Slider {...settings}>
        {fireData.map((photo) => {
          return (
            <div className={styles.cardwraper}>
              <div className={styles.card}>
                <div className={styles.card_img}>
                  <img
                    src={photo.url}
                    name={photo.name}
                    period={photo.period}
                    person={photo.person}
                    lang={photo.lang}
                    className={styles.photo}
                    onClick={handleClick}
                  ></img>
                </div>
              </div>

              <ul>
                <li>프로젝트 이름:{photo.name}</li>
                <li>예상 기간: {photo.period}</li>
                <li>현재 인원: {photo.person}</li>
                <li>사용 언어: {photo.lang}</li>
              </ul>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default Project;
