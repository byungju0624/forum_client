import React from "react";
import styles from "../../css/MyPage/Wishlist.module.css"; 
import Slider from "react-slick";

const Wishlist = (props) => {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      arrow: true,
      className: "slides",
    };
  return(
    <div className={styles.header}>
      <Slider {...settings}>
        <div>위시리스트1</div>
        <div>위시리스트2</div>
        <div>위시리스트3</div>
        <div>위시리스트4</div>
        <div>위시리스트5</div>
        <div>위시리스트6</div>
      </Slider>
    </div>
  );
};


export default Wishlist;