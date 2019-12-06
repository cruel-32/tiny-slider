# Tiny Swiper React (need react v16+)

## spec
- No dependency. (Only react)
- Swiping can be used only on mobile.

## Get started
```js
import { TinySwiper } from './tiny-swiper-react'

const App = ()=>{
    const [ items ] = useState([
        <img src="/img1.jpg" alt="imag1" />,
        <img src="/img2.jpg" alt="imag2" />,
        <img src="/img3.jpg" alt="imag3" />,
        <div>jsx</div>
    ])

    const beforeTest = ({prevIndex, nextIndex})=>{
        console.log('beforeTest prevIndex : ', prevIndex)
        console.log('beforeTest nextIndex : ', nextIndex)
    }
    const afterTest = ({selectedIndex})=>{
        console.log('afterTest selectedIndex : ', selectedIndex)
    }
    const swipingTest = ({start, event,index})=>{
        console.log('swipingTest start : ', start)
        console.log('swipingTest event : ', event)
        console.log('swipingTest index : ', index)
    }
    
    return (
        <YourApp>
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
            />
        </YourApp>
    )
}
```

## options

- items : Array

- useIndicator : Boolean

- useDirector : Boolean

- indicatorClass : String

- directorLeftClass : String

- directorRightClass : String

- before : Function({prevIndex:Number nextIndex:Number}). Before swping hook

- after : Function({currentIndex:Number}). After swping hook

- swiping : Function({
    start:{clientX:Number, clientY:Number},
    event:Event,
    index:Number,
}). Swping hook
