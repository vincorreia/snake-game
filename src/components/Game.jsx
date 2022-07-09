import React, { useEffect, useRef, useState } from "react";
import "./Game.css";
import ScoreBoard from "./ScoreBoard";
import Snake from "./Snake"

export default function Game(){
    const canvas = useRef(null)
    const [context, setContext] = useState(null)
    const [score, setScore] = useState(0);
    const [snakeBody, setSnakeBody] = useState([
        {x:100, y:100},
        {x:80, y:100},
        {x:60, y:100},
        {x:40, y:100},
        {x:20, y:100}
    ])

    const canvasDetails = {width: 1000, height:600};
    const functions = [setSnakeBody, setScore, clearCanvas]

    function clearCanvas() {
        context.clearRect(0, 0, canvasDetails.width, canvasDetails.height);
    }

    function handleKey(event) {
        switch(event.key){
            case 'ArrowUp':
                console.log("MOVE_UP")
                break
            case 'ArrowDown':
                console.log("MOVE_DOWN")
                break
            case 'ArrowLeft':
                console.log('MOVE_LEFT')
                break
            case 'ArrowRight':
                console.log("MOVE_RIGHT")
                break
            default:
        }
    }

    useEffect(() => {
        if(canvas.current){
            setContext(canvas.current.getContext("2d"));
            document.addEventListener("keydown", event => {handleKey(event)})
        }
    },[canvas])

    return (<div>
        <ScoreBoard score={score}/>
        <canvas 
        ref={canvas} 
        className="canvas" 
        width={canvasDetails.width} 
        height={canvasDetails.height}>
        </canvas>
        {canvas.current &&
            <Snake 
            canvas={context} 
            snakeBody={snakeBody}
            functions={functions}
            />
        }
        
    </div>)
}