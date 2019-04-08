import React from 'react'
import { Redirect } from 'react-router-dom'
import { Heading, Subtitle } from '../../ui-components'

const Game = ({ name, selected, changeSelect, color, desc, background }) => {
  const [redirect, setredirect] = React.useState(false)
  return redirect ? (
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#7afdd6',
        position: 'relative',
        overflow: 'hidden'
      }}
      onClick={changeSelect}
    >
    <img src={background} alt="game preview" style={{
          position: 'absolute',
          height: '100%',
          zIndex: -1
        }}/>
      <Heading style={{ fontSize: '2rem' }} onClick={() => setredirect(true)}>

        {name}
        <Subtitle style={{ fontSize: '1rem' }}>{desc}</Subtitle>
      </Heading>
    </div>
  )
}

export default Game
