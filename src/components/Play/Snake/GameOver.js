import React from 'react'

const GameOver = ({ score }) => {
  return (
    <center style={{ color: '#7afdd6', flex: 1 }}>
      <h1>Game Over</h1>
      <p>Your Score: {score}</p>
    </center>
  )
}

export default GameOver
