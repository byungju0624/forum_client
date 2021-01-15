<<<<<<< HEAD
// import '../../css/Project/Project.css';  
import styles from '../../css/Project/Project.module.css'
import Slider from "react-slick";
//import "slick-carousel/slick/slick.css";
//import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom"
// import axios from "axios";

/*const photos = [
  {
    name: "photo1",
    url:
      "http://img.khan.co.kr/news/2019/11/29/l_2019112901003607500286631.jpg",
  },
  {
    name: "photo2",
    url:
      "https://www.ui4u.go.kr/depart/img/content/sub03/img_con03030100_01.jpg",
  },
  {
    name: "photo3",
    url: "https://image.dongascience.com/Photo/2018/01/15159739972169[1].jpg",
  },
  {
    name: "photo4",
    url:
      "https://www.sisa-news.com/data/photos/20200936/art_159912317533_32480a.jpg",
  },
];

*/

let photos = null; 
let name = null; 

export default class Project extends Component {
 constructor (props) {
  super(props); 
  this.state = {
    photos: [
     {
       name: "강아지밥주기",
       url:
         "http://img.khan.co.kr/news/2019/11/29/l_2019112901003607500286631.jpg",  
     },
     {
       name: "강아지씻기기",
       url:
         "https://www.ui4u.go.kr/depart/img/content/sub03/img_con03030100_01.jpg",
     },
     {
       name: "강아지간식주기",
       url: "https://image.dongascience.com/Photo/2018/01/15159739972169[1].jpg",
     },
     {
       name: "강아지놀아주기",
       url:
         "https://www.sisa-news.com/data/photos/20200936/art_159912317533_32480a.jpg",
     }
   ]
  };
  this.handleProjectSelect = this.handleProjectSelect.bind(this); 
}
handleProjectSelect = (e) => {
 photos = e.target.src
 this.props.history.push({
   pathname: "/projectdetail",
   state: { 
     photos: photos, 
     name: name 
    },
});
};

  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      arrow: true,
      className: "slides",
      cssEase: "linear",
    };
    return (
      <div className={styles.project}>
        <h2>프로젝트 열람</h2>
        <Slider {...settings}>
          {this.state.photos.map((photo) => {
            return (<>
              <div className = {styles.wrapper}>
              <img src={photo.url} className={styles.photo} onClick = {this.handleProjectSelect} ></img></div>
            <div><ul className="project-summary">
            <li>프로젝트 이름</li>
            <li>프로젝트 개요</li>
            <li>프로젝트 기간</li>
            <li>프로젝트 인원</li>
            <li>사용 언어</li>
          </ul></div>
            </>)
=======
import styles from "../../css/Project/Project.module.css";
import { withRouter, Link } from "react-router-dom";
import Slider from "react-slick";
import React, { Component } from "react";
// const photos = [
//   {
//     name: "photo1",
//     url:
//       "http://img.khan.co.kr/news/2019/11/29/l_2019112901003607500286631.jpg",
//   },
//   {
//     name: "photo2",
//     url:
//       "https://www.ui4u.go.kr/depart/img/content/sub03/img_con03030100_01.jpg",
//   },
//   {
//     name: "photo3",
//     url: "https://image.dongascience.com/Photo/2018/01/15159739972169[1].jpg",
//   },
//   {
//     name: "photo4",
//     url:
//       "https://www.sisa-news.com/data/photos/20200936/art_159912317533_32480a.jpg",
//   },
// ];
let photo = null;
let name = null;
let period = null;
let person = null;
let lang = null;
export default class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [
        {
          name: "photo1",
          period: "2021-03-04",
          person: "4",
          lang: "javaScript,react",
          url:
            "http://img.khan.co.kr/news/2019/11/29/l_2019112901003607500286631.jpg",
        },
        {
          name: "photo2",
          period: "2021-03-10",
          person: "2",
          lang: "typeScript,react",
          url:
            "https://www.ui4u.go.kr/depart/img/content/sub03/img_con03030100_01.jpg",
        },
        {
          name: "photo3",
          period: "2021-03-15",
          person: "5",
          lang: "typeScript,react",
          url:
            "https://image.dongascience.com/Photo/2018/01/15159739972169[1].jpg",
        },
        {
          name: "photo4",
          period: "2021-03-07",
          person: "1",
          lang: "javaScript,react",
          url:
            "https://www.sisa-news.com/data/photos/20200936/art_159912317533_32480a.jpg",
        },
      ],
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick = (e) => {
    console.log(e.target.period);
    photo = e.target.src;
    name = e.target.name;
    period = e.target.period;
    person = e.target.person;
    lang = e.target.lang;
    this.props.history.push({
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

  render() {
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
          {this.state.photos.map((photo) => {
            console.log(photo.person);
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
                      onClick={this.handleClick}
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
>>>>>>> 21d15f7158949d328d3511231b28beb3d67a5d9c
          })}
        </Slider>
      </div>
    );
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 21d15f7158949d328d3511231b28beb3d67a5d9c
