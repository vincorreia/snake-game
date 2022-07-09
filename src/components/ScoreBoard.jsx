import React from "react";

export default function ScoreBoard(props) {

const score = props.score;

return (<div className="scoreBoard flexRow center">
    <div>
        <p className="score">{score}</p>
        <p className="scoreLabel">Score</p>
    </div>
</div>)
}