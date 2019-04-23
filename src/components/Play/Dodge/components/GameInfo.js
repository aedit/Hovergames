import React from 'react'

const style = () => {
  return {
    container: {
      textAlign: 'center',
      background: '#111',
      color: 'white',
    },
    info: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-around',
      color: 'whitesmoke',
    },
  }
}

const GameInfo = ({
  name,
  timeElapsed,
  playerScore,
  highScore,
  globalHighScore = 'Loading...',
}) => {
  const { container, info } = style()
  return (
    <div style={container}>
      <h3
        style={{
          color: 'white',
          padding: '0.1em',
          textShadow: '0 0 10px #7afdd6',
        }}>
        {name}
      </h3>
      <div style={info}>
        <p>Time: {timeElapsed}</p>
        <p>Score: {playerScore}</p>
      </div>
      <div style={info}>
        <p>High Score: {highScore}</p>
        <p>Global High Score: {globalHighScore}</p>
      </div>
    </div>
  )
}

// GameInfo.propTypes = {
//     timeElapsed: PropTypes.number.isRequired,
//     playerScore: PropTypes.number.isRequired,
//     highScore: PropTypes.number.isRequired,
//     // globalHighScore: PropTypes.number
// };

export default GameInfo
