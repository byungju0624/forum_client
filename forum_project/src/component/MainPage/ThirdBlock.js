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
    // <div className="App">
    // </div>
    <Carousel>
      {
        items.map( (item, i) => <div key={i} item={item} /> )
      }
    </Carousel>
  );
}

export default ThirdBlock;