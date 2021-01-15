import "../../css/MainPage/SecondBlock.css";

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

export default class ThirdBlock extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      arrow: true,
      className: "slides",
    };
    return (
      <div className="second">
        <h2>프로젝트 열람</h2>
        <Slider {...settings}>
          {photos.map((photo) => {
            return <img src={photo.url} className="img"></img>;
          })}
        </Slider>
      </div>
    );
  }
}
