import React from 'react'
import { Heading, Subtitle } from '../../ui-components'

const Game = ({ name, selected, changeSelect, color, desc, background }) => {
  return (
    <div
      style={{
        // border: selected ? '2px solid #7afdd6' : 'none',
        border: '2px solid #7afdd6',
        borderRadius: '5px',
        width: '23%',
        height: '70%',
        alignSelf: 'center',
        transform: selected ? 'scale(1.4)' : 'scale(1)',
        transition: 'transform 150ms ease',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#7afdd6',
        position: 'relative',
        overflow: 'hidden',
        zIndex: selected ? '100' : '99',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.6)'
      }}
      onClick={changeSelect}
    >
      <img
        src={background}
        alt="game preview"
        style={{
          position: 'absolute',
          height: '100%',
          zIndex: -1
        }}
      />
      <Heading style={{ fontSize: '2rem' }}>
        {name}
        <Subtitle style={{ fontSize: '1rem' }}>{desc}</Subtitle>
      </Heading>
    </div>
  )
}

export default Game
