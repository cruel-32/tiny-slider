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
    
    return (
        <YourApp>
            <TinySwiper items={items} />
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

