import React from "react";
import { useEffect } from "react";
import { useDidMountEffect } from "../hooks/useDidMountEffect"
export default function Apple(props){
    const context = props.canvas
    const apple = props.apple
    const [appleWidth, appleHeight] = [20, 20]
    useDidMountEffect(() => {
        context.fillStyle = "red"
        context.fillRect(apple.x, apple.y, appleWidth, appleHeight)
    }, [apple, props.snakeBody])


}