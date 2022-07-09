import React, { useEffect, useRef, useState } from "react";
import Apple from "./Apple";
import "./Game.css";
import ScoreBoard from "./ScoreBoard";
import Snake from "./Snake"
import Start from "./Start";

export default function Game(){
    const initialSnake = [
        {x:100, y:100},
        {x:80, y:100},
        {x:60, y:100},
        {x:40, y:100},
        {x:20, y:100}
    ]
    const canvasDetails = {width: 1000, height:600};
    const canvas = useRef(null)
    const [context, setContext] = useState(null)
    const [direction, setDirection] = useState("RIGHT");
    const [text, setText] = useState("Press ENTER to start")
    const [apple, setApple] = useState({
        x: (Math.floor(Math.random() * ((canvasDetails.width - 20) / 20))) * 20,
        y: (Math.floor(Math.random() * ((canvasDetails.height - 20) / 20))) * 20
    })
    const [score, setScore] = useState(0);
    const [snakeBody, setSnakeBody] = useState(initialSnake)
    const [isRunning, setIsRunning] = useState(false)
    var previousDirection = "RIGHT"
    const functions = [setSnakeBody, setScore, clearCanvas, generateApple, setIsRunning, reset]
    
    function clearCanvas() {
        context.clearRect(0, 0, canvasDetails.width, canvasDetails.height);
    }

    function handleKey(event) {
        switch(event.key){
            case 'ArrowUp':
                if(previousDirection !== "DOWN"){
                    setDirection("UP")
                    previousDirection = "UP"
                }
                break
            case 'ArrowDown':
                if(previousDirection !== "UP"){
                    setDirection("DOWN")
                    previousDirection = "DOWN"
                }
                break
            case 'ArrowLeft':
                if(previousDirection !== "RIGHT"){
                    setDirection("LEFT")
                    previousDirection = "LEFT"
                }
                break
            case 'ArrowRight':
                if(previousDirection !== "LEFT"){
                    setDirection("RIGHT")
                    previousDirection = "RIGHT"
                }
                break
            case 'Enter':
                if(!isRunning){
                    setIsRunning(true)
                    previousDirection="RIGHT"
                }
                break
            default:
                console.log(event.key)
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

    function reset(){
        if(snakeBody[0].x !== initialSnake[0].x || snakeBody[0].y !== initialSnake[0].y){
            setText("You died! Press ENTER to restart")
            setSnakeBody(initialSnake)
            generateApple()
            setDirection("RIGHT")
            setScore(0)
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
        <>
            <Snake 
            isRunning={isRunning}
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
            apple={apple}
            />
            <Start 
                isRunning={isRunning}
                context={context}
                text={text}
                canvas={canvasDetails}
            />
        </>
        }
        
    </div>)
}