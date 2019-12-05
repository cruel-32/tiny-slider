import React, { useState, useEffect, useRef, Fragment} from 'react'
import './index.scss'

export const SwiperItem = props => {
    const { children, width } = props

    return (
        <div className="tnswiper__item" style={{width}} >{children}</div>
    )
}

export const TinySwiper = props => {
    const {
        items, before, after, children, useIndicator,
        indicatorClass, useDirector,
        directorLeftClass, directorRightClass
    } = props
    
    const tnSwiperRef = useRef(null)
    const swiperWrapRef = useRef(null)

    const slidingItems = children || items;

    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [index, setIndex] = useState(0)
    const [left, setLeft] = useState(0)
    const [moving, setMoving] = useState(false)
    const [mouseX, setMouseX] = useState(0)

    useEffect(() => {
        setWidth(tnSwiperRef.current ? tnSwiperRef.current.offsetWidth : 0)
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
        if(index < 0){
            setIndex(slidingItems.length-1)
        } else if(index >= slidingItems.length){
            setIndex(0)
        }
    }

    const swipe = (newIndex) =>{
        const idx = index%slidingItems.length;
        const newIdx = newIndex%slidingItems.length;

        if(moving || idx === newIdx){//움직이는 중이거나 같은 숫자가 들어오면
            return
        }

        beforeSwipe()
        setIndex(newIndex)
    }

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
            swipe(index-1)
        } else if(amount > 0 && width/3 < amount){
            swipe(index+1)
        } else{
            returnCenter()
        }
    }

    const returnCenter = ()=> {
        setMouseX(0)
        beforeSwipe()
    }

    return (
        <div className='tnswiper tnswiper--visible' ref={tnSwiperRef} style={{height:height+'px'}} >
            <div className={`tnswiper__wrapper tnswiper__wrapper--display-flex tnswiper__wrapper--align-top ${moving ? 'tnswiper__wrapper--moving' : ''} `}
                style={{left:(left-width)+'px', width:width*(slidingItems.length+2)}}
                ref={swiperWrapRef}
                onTransitionEnd={(e)=>{afterSwipe(e)}}
                onTouchStart={e=>{touchStart(e)}}
                onTouchMove ={e=>{touchMove(e)}}
                onTouchEnd ={e=>{TouchEnd(e)}}
            >
                <SwiperItem key={-1} width={width} >{slidingItems[slidingItems.length-1]}</SwiperItem>
                {
                    slidingItems.map((copiedItem,index)=>(
                        <SwiperItem key={index} width={width} >{copiedItem}</SwiperItem>
                    ))
                }
                <SwiperItem key={slidingItems.length} width={width} >{slidingItems[0]}</SwiperItem>
            </div>

            {
                useIndicator && (
                    <div className={"tnswiper__indicator-wrap tnswiper__indicator-wrap--pos-bot "+indicatorClass}>
                        {
                            // index가 slidingItems.length와 같거나 높아지면 0으로. index가 0보다 작아지면 slidingItems.length-1로.
                            slidingItems.map((slidingItem, idx)=>(
                                <button className={"tnswiper__indicator " +
                                    (idx === (index >= slidingItems.length ? 0 : (index < 0 ? slidingItems.length-1 : index) ) ? "tnswiper__indicator--active" :  "")}
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
                        <button  onClick={()=>{swipe(index-1)}} className={"tnswiper__director tnswiper__director--dir-left "+directorLeftClass}>left</button>
                        <button  onClick={()=>{swipe(index+1)}} className={"tnswiper__director tnswiper__director--dir-right "+directorRightClass}>right</button>
                    </Fragment>
                )
            }

        </div>
    )
}

