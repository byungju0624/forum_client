import styles from "../../css/Project/Project.module.css";
import { withRouter, Link, useHistory } from "react-router-dom";
import Slider from "react-slick";
import firebase from "firebase/app";
import { firestore } from "../../firebase";
import { storage } from "../../firebase";
import React, { useState } from "react";
import { useEffect } from "react";

let photo = null;
let name = null;
let period = null;
let person = null;
let lang = null;


function Project (props) {

	let json = localStorage.getItem("fireStoreData")
	let localData = JSON.parse(json) || [];
	let [dataFire, setDataFire] = useState(localData)
	
	/*function delay(ms){
		return new Promise((resolve, reject) =>{
			setTimeout(resolve, ms)
		})
	}*/


	/*useEffect(async ()=> {
		await delay(2000)
		console.log("루삥뽕"+JSON.stringify(dataFire))
	},[])*/


	let history = useHistory();
	
  let handleClick = (e) => {
    console.log('e.target:', e.target)
    photo = e.target.src;
    name = e.target.name;
    period = e.target.period;
    person = e.target.person;
    lang = e.target.lang;
    console.log('이미지:', photo, '이름:', name, '기간:', period, '인원:', person, '스킬', lang)
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
        {dataFire.map((eachData) => {
          console.log('개별 프로젝트 데이터:', eachData)
          return (
            <div className={styles.cardwraper}>
              <div className={styles.card}>
                <div className={styles.card_img}>
                  <img
                    src={eachData.image}
                    name={eachData.name}
                    period={eachData.term}
                    person={eachData.party}
                    lang={eachData.skill}
                    className={styles.photo}
                    onClick={handleClick}
                  ></img>
                </div>
              </div>
              <ul>
                <li>프로젝트 이름:{eachData.name}</li>
                <li>예상 기간: {eachData.term}</li>
                <li>현재 인원: {eachData.party}</li>
                <li>사용 언어: {eachData.skill}</li>
              </ul>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}


export default Project;