import React from "react";
import styles from "../../css/MyPage/WishList.module.css";
// import Slider from "react-slick";
const WishList = (props) => {
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   slidesToShow: 3,
  //   slidesToScroll: 3,
  //   arrow: true,
  //   className: "slides",
  // };

  let dataFire = JSON.parse(localStorage.getItem("fireStoreData"))
  console.log('파이어베이스 데이터(전체):', dataFire);

  return (
    <div className={styles.header}>
      {/* <Slider {...settings}>
        <div>위시리스트1</div>
        <div>위시리스트2</div>
        <div>위시리스트3</div>
        <div>위시리스트4</div>
        <div>위시리스트5</div>
      </Slider> */}
      <h3>내가 등록한 프로젝트</h3>
      <div className={styles.firstContainer}>
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
      </div>

      <div className={styles.secondContainer}>
        <h3>내가 참가 중인 프로젝트</h3>
      </div>
    </div>
  );
};

export default WishList;
