import React, { useEffect, useRef, useState } from "react";
import Apple from "./Apple";
import "./Game.css";
import ScoreBoard from "./ScoreBoard";
import Snake from "./Snake"

export default function Game(){
    const canvasDetails = {width: 1000, height:600};
    const canvas = useRef(null)
    const [context, setContext] = useState(null)
    const [direction, setDirection] = useState("RIGHT");
    const [apple, setApple] = useState({
        x: (Math.floor(Math.random() * ((canvasDetails.width - 20) / 20))) * 20,
        y: (Math.floor(Math.random() * ((canvasDetails.height - 20) / 20))) * 20
    })
    const [score, setScore] = useState(0);
    const [snakeBody, setSnakeBody] = useState([
        {x:100, y:100},
        {x:80, y:100},
        {x:60, y:100},
        {x:40, y:100},
        {x:20, y:100}
    ])
    const functions = [setSnakeBody, setScore, clearCanvas, generateApple]

    function clearCanvas() {
        context.clearRect(0, 0, canvasDetails.width, canvasDetails.height);
    }

    function handleKey(event) {
        switch(event.key){
            case 'ArrowUp':
                setDirection("UP")
                break
            case 'ArrowDown':
                setDirection("DOWN")
                break
            case 'ArrowLeft':
                setDirection('LEFT')
                break
            case 'ArrowRight':
                setDirection("RIGHT")
                break
            default:
        }
    }

    function generateApple(){
        // generate random X and Y coords, we need to divide by 20 and multiply later to get only multiples of 20
        // also important to notice that we have to reduce 20 from the total width and height, or the apple will spawn
        // out of the canvas
        let randomX = (Math.floor(Math.random() * ((canvasDetails.width - 20) / 20))) * 20
        let randomY = (Math.floor(Math.random() * ((canvasDetails.height - 20) / 20))) * 20

        setApple({x: randomX, y:randomY})
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
        <>
            <Snake 
            canvas={context} 
            snakeBody={snakeBody}
            functions={functions}
            direction={direction}
            appleLocation={apple}
            />
            <Apple
            canvas={context}
            generateApple={generateApple} 
            snakeBody={snakeBody} 
            apple={apple}></Apple>
        </>
        }
        
    </div>)
}