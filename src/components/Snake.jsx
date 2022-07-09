import React from "react";
import { useEffect } from "react";



export default function Snake(props) {
   const direction = props.direction
   const appleLocation = props.appleLocation
   const [setSnakeBody, setScore, clearCanvas, generateApple] = props.functions;
   const snakeBody = props.snakeBody
   const [partWidth, partHeight] = [20, 20]
   const head = snakeBody[0]
   const context = props.canvas

   function move(direction, snakeBody){
      const newLocation = snakeBody.map((part, i) => {
         let updatedPart
         if(part === head){
            switch(direction){
               case "RIGHT":
                  updatedPart = {...part, x: part.x + 20}
               break
               case "DOWN":
                  updatedPart = {...part, y: part.y + 20}
               break
               case "LEFT":
                  updatedPart = {...part, x: part.x - 20}
                  break
               case "UP":
                  updatedPart = {...part, y: part.y - 20}
                  break
               default:
                  updatedPart = {...part}
            }
         } else {
            updatedPart = snakeBody[i-1];
         }
         

         return updatedPart
      })

      const newHead = newLocation[0]

      if(newHead.x === appleLocation.x && newHead.y === appleLocation.y){
         eat()
      }

      function eat(){
         newLocation.push(snakeBody[snakeBody.length - 1])
         setScore(newLocation.length - 5);
         generateApple()
      }
      setSnakeBody(newLocation);
   }
   // Render snake on the screen and remove the snake previous location
    useEffect(() => {
      clearCanvas()
      setTimeout(() => {move(direction, snakeBody)}, 500);
      snakeBody.forEach(part => {
         context.fillStyle = "white"
         context.fillRect(part.x, part.y, partWidth, partHeight)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [snakeBody])
}