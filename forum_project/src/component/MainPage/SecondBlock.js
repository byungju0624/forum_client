import "../../css/MainPage/SecondBlock.css";
import Slider from "react-slick";
import React, { useState } from "react";
import { useEffect } from "react";

let dataFire = JSON.parse(localStorage.getItem("fireStoreData"))

function SecondBlock () {

	useEffect(() => {
		console.log("루삥뽕"+JSON.stringify(dataFire))
	},[])

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrow: true,
		className: "slides",
	}

  return (
    <div className="second">
      <h2>프로젝트 열람</h2>
        {/* <Slider {...settings}>
          {dataFire.map((eachData) => {
            return <img src={eachData.image} className="img"></img>;
          })}
        </Slider> */}
      </div>
    );
  }



export default SecondBlock