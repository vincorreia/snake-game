import { useEffect } from "react";



export default function Snake(props) {
   const direction = props.direction
   const isRunning = props.isRunning
   const appleLocation = props.appleLocation
   const [setSnakeBody, setScore, clearCanvas, generateApple, setDirection, setIsRunning] = props.functions;
   const snakeBody = props.snakeBody
   const [partWidth, partHeight] = [20, 20]
   const head = snakeBody[0]
   const context = props.canvas

   function move(direction, snakeBody){
      let newLocation = snakeBody.map((part, i) => {
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
      let count = 0

      newLocation.forEach(coord => {
         if(coord.x === newHead.x && coord.y === newHead.y){
            count++
         }
      })

      if(newHead.x === appleLocation.x && newHead.y === appleLocation.y) {
         eat()
      } else if (count > 1){ /* Die if the user colide with the snake body */
         die()
      } else if (newHead.x > 1000 || newHead.x < 0 || newHead.y > 600 || newHead.y < 0){ /* Die if the user colide with the game border */
         die()
      }

      function eat(){
         newLocation.push(snakeBody[snakeBody.length - 1])
         setScore(newLocation.length - 5);
         generateApple();
      }

      function die(){
         setIsRunning(false)
      }
      if(isRunning){
         setSnakeBody(newLocation);
      }
   }
   function clearMove(timeout){
      clearTimeout(timeout);
   }
   // Render snake on the screen and remove the snake previous location
    useEffect(() => {

      // What to do if the user is not dead
      
      if(isRunning){
         clearCanvas()
         var timeout = setTimeout(() => {move(direction, snakeBody)}, 100);
         
         snakeBody.forEach(part => {
            context.fillStyle = "white"
            context.fillRect(part.x, part.y, partWidth, partHeight)
         })
      } 

      //What to do if the user is dead
      else {
         clearMove(timeout);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [snakeBody])
}