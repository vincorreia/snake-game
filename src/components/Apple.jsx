import React from "react";
import { useEffect } from "react";
import { useDidMountEffect } from "../hooks/useDidMountEffect"
export default function Apple(props){
    const newApple = props.generateApple
    const context = props.canvas
    const head = props.snakeBody[0]
    const apple = props.apple
    const [appleWidth, appleHeight] = [20, 20]
    useDidMountEffect(() => {
        if(head == apple){
            console.log("colision")
            newApple();
        }
        context.fillStyle = "red"
        context.fillRect(apple.x, apple.y, appleWidth, appleHeight)
    }, [apple, props.snakeBody])


}