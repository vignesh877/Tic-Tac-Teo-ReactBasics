import React from 'react'

const GameOver = ({winner , onRematch}) => {
  return (
    <div id='game-over'>
        <h2>Game Over</h2>
        {winner && <p>{winner} is winner</p>}
        {!winner && <p>It's draw </p>}
        <p>
            <button  onClick = {onRematch}>Rematch !!</button>
        </p>
    </div>
  )
}

export default GameOver