import React from 'react'
import { Window, Progress, useFromToPose, Heading } from '../../ui-components'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

const StyledUl = styled.ul`
  text-transform: uppercase;
  li {
    display: flex;
  }
  p {
    text-transform: capitalize;
  }
`

const inst = {
  Snake: {
    up: 'Moves the snake in up direction.',
    down: 'Moves the snake in down direction.',
    right: 'Moves the snake in left direction',
    left: 'Moves the snake in right direction.',
    close: 'Closes the game and redirects to the Dashboard.',
  },
  Pong: {
    up: 'The player paddle moves with hand movement.',
    down: 'The player paddle moves with hand movement.',
    right: 'Not Available!',
    left: 'Starts the game.',
    close: 'Closes the game and redirects to the Dashboard.',
  },
  Breakout: {
    up: 'Starts the game.',
    down: 'Not Available!',
    right: 'The player paddle moves with hand movement.',
    left: 'The player paddle moves with hand movement.',
    close: 'Closes the game and redirects to the Dashboard.',
  },
  Dodge: {
    up: 'Moves the block in up direction.',
    down: 'Moves the block in down direction.',
    right: 'Moves the block in left direction',
    left: 'Moves the block in right direction.',
    close: 'Closes the game and redirects to the Dashboard.',
  },
}

const Instructions = ({ game }) => {
  const { [game]: g } = inst
  const progressPose = useFromToPose(1, { from: 'empty', to: 'full' })
  const [redirect, setRedirect] = React.useState(false)
  React.useEffect(() => {
    if (progressPose === 'full') setTimeout(() => setRedirect(true), 7000)
  }, [progressPose])
  const isLoggedin =
    localStorage.hasOwnProperty('token') ||
    localStorage.hasOwnProperty('guestid')
  return !isLoggedin ? (
    <Redirect to="/" />
  ) : redirect === true ? (
    <Redirect to={`/${game}`} />
  ) : (
    <Window>
      <Heading style={{ fontSize: '3rem' }}>Gesture map</Heading>
      <StyledUl style={{ gridArea: 'list', listStyle: 'none' }}>
        <li>
          <strong>UP:</strong> <p>{g.up}</p>
        </li>
        <li>
          <strong>DOWN:</strong> <p>{g.down}</p>
        </li>
        <li>
          <strong>RIGHT:</strong> <p>{g.right}</p>
        </li>
        <li>
          <strong>LEFT:</strong> <p>{g.left}</p>
        </li>
        <li>
          <strong>CLOSE:</strong> <p>{g.close}</p>
        </li>
      </StyledUl>
      <Progress pose={progressPose} style={{ gridArea: 'footer' }}>
        <div />
      </Progress>
    </Window>
  )
}

export default Instructions
