import '../../css/Project/Project.css';  

import Slider from "react-slick";
import React, { Component } from "react";
const photos = [
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

export default class Project extends Component {
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
        <div className="project">
          <h2>프로젝트 열람</h2>
          <Slider {...settings}>
            {photos.map((photo) => {
              return (<>
              <div className="photo-wrap">
                <img src={photo.url} className="photo"></img>
                <button className="view-btn">자세히 보기</button>
              </div>
              <div><ul className="project-summary">
              <li>프로젝트 이름</li>
              <li>프로젝트 개요</li>
              <li>프로젝트 기간</li>
              <li>프로젝트 인원</li>
              <li>사용 언어</li>
            </ul></div>
              </>)
            })}
          </Slider>
        </div>
    )
  };
}
