import React, { useState, useEffect, useRef, Fragment} from 'react'
import './index.scss'

export const SwiperItem = props => {
    const { children, width } = props

    return (
        <div className="mrswiper__item" style={{width}} >{children}</div>
    )
}

export const MiniReactSwiper = props => {
    const {
        items, before, after, children, useIndicator,
        indicatorClass, useDirector,
        directorLeftClass, directorRightClass
    } = props
    
    const mrSwiperRef = useRef(null)
    const swiperWrapRef = useRef(null)

    const slidingItems = children || items;

    const [copiedItems, setCopiedItems] = useState([
        ...slidingItems.slice(slidingItems.length-1,slidingItems.length), ...slidingItems, ...slidingItems.slice(0,1)
    ])
    
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [index, setIndex] = useState(1)
    const [left, setLeft] = useState(0)
    const [moving, setMoving] = useState(false)
    const [mouseX, setMouseX] = useState(0)

    useEffect(() => {
        setCopiedItems([ ...slidingItems.slice(slidingItems.length-1,slidingItems.length), ...slidingItems, ...slidingItems.slice(0,1) ])
        setWidth(mrSwiperRef.current ? mrSwiperRef.current.offsetWidth : 0)
        setHeight(swiperWrapRef.current ? swiperWrapRef.current.offsetHeight : 0)
        setLeft(swiperWrapRef.current ? -(index * width) : 0)
    }, [slidingItems, index, width, mouseX])

    const beforeSwipe = ()=>{
        setMoving(true)
        before && before({
            index:index-1,
        })
    }

    const afterSwipe = ()=>{
        setMoving(false)
        replaceCenter();
        after && after({
            index:index-1,
        })
    }

    const replaceCenter = () => {
        if(index === copiedItems.length-1){
            setIndex(1)
        } else if(index === 0){
            setIndex(slidingItems.length)
        }
    }

    const swipe = (newIndex) =>{
        newIndex+=1;
        const idx = index%slidingItems.length;
        const newIdx = newIndex%slidingItems.length;

        if(moving){//움직이는 중
            return
        }

        if(idx === newIdx){
            return
        }

        beforeSwipe()
        setIndex((newIndex + copiedItems.length)%copiedItems.length)
    }

    const swipeLeft = ()=> swipe(index-2)
    const swipeRight = ()=> swipe(index)

    const touchStart = e => setMouseX(e.touches[0].clientX)
    const touchMove = e =>{
        const moveX = e.changedTouches[0].clientX - mouseX
        if(moveX && (left + moveX)){
            setLeft(-(index * width)+moveX)
        }
    }

    const TouchEnd  = e =>{
        const amount = mouseX - e.changedTouches[0].clientX;

        if(amount < 0 && width/3 < Math.abs(amount)){
            swipeLeft()
        } else if(amount > 0 && width/3 < amount){
            swipeRight()
        } else{
            returnCenter()
        }
    }

    const returnCenter = ()=> {
        setMouseX(0)
        beforeSwipe()
    }

    return (
        <div className='mrswiper mrswiper--visible' ref={mrSwiperRef} style={{height:height+'px'}} >
            <div className={`mrswiper__wrapper mrswiper__wrapper--display-flex mrswiper__wrapper--align-top ${moving ? 'mrswiper__wrapper--moving' : ''} `}
                style={{left:left+'px', width:width*copiedItems.length}}
                ref={swiperWrapRef}
                onTransitionEnd={(e)=>{afterSwipe(e)}}
                onTouchStart={e=>{touchStart(e)}}
                onTouchMove ={e=>{touchMove(e)}}
                onTouchEnd ={e=>{TouchEnd(e)}}
            >
                {
                    copiedItems.map((copiedItem,index)=>(
                        <SwiperItem key={index} width={width} >{copiedItem}</SwiperItem>
                    ))
                }
            </div>

            {
                useIndicator && (
                    <div className={"mrswiper__indicator-wrap mrswiper__indicator-wrap--pos-bot "+indicatorClass}>
                        {
                            slidingItems.map((slidingItem, idx)=>(
                                <button className={"mrswiper__indicator " + ( (idx+1) === (index === 5 ? 1 : (index === 0 ? 4 : index))  ? "mrswiper__indicator--active" : "")}
                                    onClick={()=>{swipe(idx)}} key={idx}
                                >{idx}
                                </button>
                            ))
                        }
                    </div>
                )
            }

            {
                useDirector && (
                    <Fragment>
                        <button  onClick={swipeLeft} className={"mrswiper__director mrswiper__director--dir-left "+directorLeftClass}>left</button>
                        <button  onClick={swipeRight} className={"mrswiper__director mrswiper__director--dir-right "+directorRightClass}>right</button>
                    </Fragment>
                )
            }

        </div>
    )
}

