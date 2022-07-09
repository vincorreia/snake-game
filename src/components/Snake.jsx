import React from "react";
import { useEffect } from "react";



export default function Snake(props) {
   const [setSnakeBody, setScore, clearCanvas] = props.functions;
   const snakeBody = props.snakeBody
   const [partWidth, partHeight] = [20, 20]

   const context = props.canvas

    useEffect(() => {
      clearCanvas()
      snakeBody.forEach(part => {
         context.fillStyle = "white"
         context.fillRect(part.x, part.y, partWidth, partHeight)
      })
    })
}