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
        directorLeftClass, directorRightClass, swiping
    } = props
    
    const tnSwiperRef = useRef(null)
    const swiperWrapRef = useRef(null)

    const slidingItems = children || items;

    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [index, setIndex] = useState(0)
    const [left, setLeft] = useState(0)
    const [isMoving, setIsMoving] = useState(false)
    const [mousePos, setMousePos] = useState({clientX:0,clientY:0})

    useEffect(() => {
        setWidth(tnSwiperRef.current ? tnSwiperRef.current.offsetWidth : 0)
        setHeight(swiperWrapRef.current ? swiperWrapRef.current.offsetHeight : 0)
        setLeft(swiperWrapRef.current ? -(index * width) : 0)
    }, [slidingItems, index, width, mousePos])

    const getAvailableIndex = index =>{
        let itemIndex = index;
        if(itemIndex < 0) itemIndex = slidingItems.length - 1
        if(itemIndex >= slidingItems.length) itemIndex = 0
        return itemIndex
    }

    const beforeSwipe = (prevIndex, nextIndex)=>{
        setIsMoving(true)
        before && before({
            prevIndex : getAvailableIndex(prevIndex),
            nextIndex : getAvailableIndex(nextIndex),
        })
    }

    const afterSwipe = ()=>{
        setIsMoving(false)
        setIndex(getAvailableIndex(index))
        after && after({
            currentIndex : getAvailableIndex(index)
        })
    }

    const swipe = (selectedIndex) =>{
        const prevIndex = index%slidingItems.length;
        const nextIndex = selectedIndex%slidingItems.length;

        if(isMoving || prevIndex === nextIndex){
            return
        }

        beforeSwipe(prevIndex, nextIndex)
        setIndex(selectedIndex)
    }

    const touchStart = event => {
        const {clientX, clientY} = event.touches[0];
        setMousePos({clientX, clientY})
    }

    const touchMove = event =>{
        const moveX = event.changedTouches[0].clientX - mousePos.clientX
        if(moveX && (left + moveX)){
            setLeft(-(index * width)+moveX)
            swiping({start:mousePos,event, index})
        }
    }
    const TouchEnd  = event =>{
        const amount = mousePos.clientX - event.changedTouches[0].clientX;
        if(amount < 0 && 60 < Math.abs(amount)){
            swipe(index-1)
        } else if(amount > 0 && 60 < amount){
            swipe(index+1)
        } else{
            returnCenter()
        }
    }
    const returnCenter = ()=> {
        setMousePos({clientX:0,clientY:0})
        beforeSwipe()
    }

    return (
        <div className='tnswiper tnswiper--visible' ref={tnSwiperRef} style={{height:height+'px'}} >
            <div className={`tnswiper__wrapper tnswiper__wrapper--display-flex tnswiper__wrapper--align-top ${isMoving ? 'tnswiper__wrapper--is-moving' : ''} `}
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
                                    (idx === getAvailableIndex(index) ? "tnswiper__indicator--active" :  "")}
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

