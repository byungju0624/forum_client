import styles from "../../css/Project/Project.module.css";
import { withRouter, Link } from "react-router-dom";
import Slider from "react-slick";
import firebase from "firebase/app";
import { firestore } from "../../firebase";
import { storage } from "../../firebase";
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from 'react-router-dom';

let photo = null;
let name = null;
let period = null;
let person = null;
let lang = null;

let dataFire = JSON.parse(localStorage.getItem("fireStoreData"))

function Project (props) {

	let history = useHistory();
	
  let handleClick = (e) => {
    //console.log(e.target.person);
    photo = e.target.src;
    name = e.target.name;
    period = String(e.target.period);
    person = String(e.target.person);
    lang = e.target.lang;
    console.log(String(e.target.person));
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