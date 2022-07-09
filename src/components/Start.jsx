import { useEffect } from "react"

export default function Start(props){
    const text = props.text
    const canvas = props.canvas
    const context = props.context
    const isRunning = props.isRunning

    useEffect(() => {
        if(!isRunning){
            context.fillStyle = "white"
            context.font = "30px 'Press Start 2P'"
            context.textAlign = "center"
            context.fillText(text, canvas.width/2, (canvas.height/2) - 20)
        }
    })
}