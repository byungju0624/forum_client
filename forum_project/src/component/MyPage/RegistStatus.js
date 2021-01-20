import React from "react";
import styles from "../../css/MyPage/RegistStatus.module.css";
import Slider from "react-slick";
const RegistStatus = (props) => {
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
        <div>등록1</div>
        <div>등록2</div>
        <div>등록3</div>
        <div>등록4</div>
        <div>등록5</div>
      </Slider>
    </div>
  );
};

export default RegistStatus;
