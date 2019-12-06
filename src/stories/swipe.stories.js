import React, {useState}from 'react';
// import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';

// import { storiesOf } from '@storybook/react';

import { TinySwiper, } from 'tiny-swiper-react'
import img1 from 'images/1.png';
import img2 from 'images/2.png';
import img3 from 'images/3.png';
import added from 'images/added.png';

export default {
  title: 'Tiny Swipe',
};

// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

export const defaultUsing = ()=>{
  const [ items, setItems ] = useState([
    <img src={img1} className="App-logo" alt="logo" />,
    <img src={img2} className="App-logo" alt="logo" />,
    <img src={img3} className="App-logo" alt="logo" />,
    <div>
      <h1>jsx</h1>
      <p>
        Swiping can be used only on mobile.
        jsx로 만든 마지막 슬라이드입니다.
        jsx로 만든 마지막 슬라이드입니다.
        jsx로 만든 마지막 슬라이드입니다.
      </p>
    </div>
  ])

  const addItem = ()=>{
    setItems([...items, <img src={added} className="App-logo" alt="logo" />])
    action()
  }

  const removeLastItem = ()=>{
    setItems([...items.slice(0,items.length-1)])
  }

  const beforeTest = ({prevIndex, nextIndex})=>{
    console.log('beforeTest prevIndex : ', prevIndex)
    console.log('beforeTest nextIndex : ', nextIndex)
  }
  const afterTest = ({currentIndex})=>{
    console.log('afterTest currentIndex : ', currentIndex)
  }
  const swipingTest = ({start, event,index})=>{
    console.log('swipingTest start : ', start)
    console.log('swipingTest event : ', event)
    console.log('swipingTest index : ', index)
  }

  return (
    <div>
      <Button onClick={()=>{addItem()}}>add new item</Button>
      <Button onClick={()=>{removeLastItem()}}>remove last item</Button>
      <TinySwiper
        items={items}
        useIndicator={true}
        useDirector={true}
        indicatorClass={"override"}
        directorLeftClass={"override"}
        directorRightClass={"override"}
        before={beforeTest}
        after={afterTest}
        swiping={swipingTest}
      >
      </TinySwiper>
    </div>
  )
}
