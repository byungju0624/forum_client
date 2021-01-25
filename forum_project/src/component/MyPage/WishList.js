import React from "react";
import styles from "../../css/MyPage/WishList.module.css";
import Slider from "react-slick";
const WishList = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrow: true,
    className: "slides",
  };
  return (
    <div className={styles.header}>
      <Slider {...settings}>
        <div>위시리스트1</div>
        <div>위시리스트2</div>
        <div>위시리스트3</div>
        <div>위시리스트4</div>
        <div>위시리스트5</div>
      </Slider>
    </div>
  );
};

export default WishList;
