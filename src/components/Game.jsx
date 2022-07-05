import React, { useEffect, useRef, useState } from "react";
import "./Game.css";
import Snake from "./Snake"

export default function Game(){
    const [canvasNode, setCanvasNode] = useState(null)
    const canvas = useRef(null)
    useEffect(() => {
        if(canvas.current){
            setCanvasNode(canvas.current);
        }
    },[canvas])

    return (<div>
        <canvas 
        ref={canvas} 
        className="canvas" 
        width={400} 
        height={400}>
        </canvas>
        <Snake canvas={canvasNode}></Snake>
    </div>)
}