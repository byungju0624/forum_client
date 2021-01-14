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
export default class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [
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
          url:
            "https://image.dongascience.com/Photo/2018/01/15159739972169[1].jpg",
        },
        {
          name: "photo4",
          url:
            "https://www.sisa-news.com/data/photos/20200936/art_159912317533_32480a.jpg",
        },
      ],
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick = (e) => {
    console.log(e.target);
    photo = e.target.src;
    name = e.target.name;
    this.props.history.push({
      pathname: "/projectdetail",
      state: {
        photos: photo,
        name: name,
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
            return (
              <div className={styles.cardwraper}>
                <div className={styles.card}>
                  <div className={styles.card_img}>
                    <img
                      src={photo.url}
                      name={photo.name}
                      className={styles.photo}
                      onClick={this.handleClick}
                    ></img>
                  </div>
                </div>

                <ul>
                  <li>프로젝트</li>
                  <li>프로젝트</li>
                  <li>프로젝트</li>
                  <li>프로젝트</li>
                </ul>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}
