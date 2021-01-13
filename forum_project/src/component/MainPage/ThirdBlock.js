import '../../css/MainPage/ThirdBlock.css';
import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'

function ThirdBlock() {

  var items = [
    {
        name: "Random Name #1",
        description: "Probably the most random thing you have ever seen!"
    },
    {
        name: "Random Name #2",
        description: "Hello World!"
    }
  ] 
  return (
    <div className="third_block">
			<div className="regist_box">
				<div className="regist_text">
					프로젝트 등록하기
				</div>
				<img src="image/regist.png"></img>
			</div>
    </div>
  );
}

export default ThirdBlock;