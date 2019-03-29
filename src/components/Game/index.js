import React from 'react'
import { Redirect } from 'react-router-dom'
import { Heading, Subtitle } from '../../ui-components'

const Game = ({ name, selected, changeSelect, color, desc }) => {
  const [red, setRed] = React.useState(false)
  return red ? (
    <Redirect to={`/${name}`} />
  ) : (
    <div
      style={{
        border: selected ? '2px solid #7afdd6' : 'none',
        width: '25%',
        height: '75%',
        alignSelf: 'center',
        transform: selected ? 'scale(1.4)' : 'scale(1)',
        transition: 'transform 300ms ease',
        background: color
      }}
      onClick={changeSelect}
    >
      <Heading style={{ fontSize: '2rem' }} onClick={() => setRed(true)}>
        {name}
        <Subtitle style={{ fontSize: '1rem' }}>{desc}</Subtitle>
      </Heading>
    </div>
  )
}

export default Game
