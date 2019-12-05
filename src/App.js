import React, { useState, } from 'react';
import img1 from 'images/1.png';
import img2 from 'images/2.png';
import img3 from 'images/3.png';

import { MiniReactSwiper, } from 'tiny-swiper-react'

import slide, * as slide2 from './dist/index'
console.log('slide : ', slide)
console.log('slide2 : ', slide2)

const App = ()=>{
  const [ items ] = useState([
    <img src={img1} className="App-logo" alt="logo" />,
    <img src={img2} className="App-logo" alt="logo" />,
    <img src={img3} className="App-logo" alt="logo" />,
    <div>
      <h1>jsx</h1>
      <p>
        jsx로 만든 마지막 슬라이드입니다.
        jsx로 만든 마지막 슬라이드입니다.
        jsx로 만든 마지막 슬라이드입니다.
        jsx로 만든 마지막 슬라이드입니다.
      </p>
    </div>
  ])


  return (
    <div className="App">
      <div style={{width:'300px', background:'#333'}} >

        <MiniReactSwiper
          items={items}
          useIndicator={true}
          useDirector={true}
          indicatorClass={"override"}
          directorLeftClass={"override"}
          directorRightClass={"override"}
        >
        </MiniReactSwiper>

      </div>

    </div>
  );
}

export default App;
