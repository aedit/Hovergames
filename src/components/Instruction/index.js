import React from 'react'
import { Window, Progress, useFromToPose, Heading } from '../../ui-components'
import { Redirect } from 'react-router-dom'

const inst = {
  snake: {
    up: 'YO! ADD TEXT',
    down: 'YO! ADD TEXT',
    right: 'YO! ADD TEXT',
    left: 'YO! ADD TEXT',
  },
  pong: {
    up: 'YO! ADD TEXT',
    down: 'YO! ADD TEXT',
    right: 'YO! ADD TEXT',
    left: 'YO! ADD TEXT',
  },
  breakout: {
    up: 'YO! ADD TEXT',
    down: 'YO! ADD TEXT',
    right: 'YO! ADD TEXT',
    left: 'YO! ADD TEXT',
  },
  dodge: {
    up: 'YO! ADD TEXT',
    down: 'YO! ADD TEXT',
    right: 'YO! ADD TEXT',
    left: 'YO! ADD TEXT',
  },
}

const Instructions = ({ game }) => {
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
      <Heading>Gesture map:</Heading>
      <ul>
        <li>UP: {inst[game].up}</li>
        <li>DOWN: {inst[game].down}</li>
        <li>RIGHT: {inst[game].right}</li>
        <li>LEFT: {inst[game].left}</li>
      </ul>
      <Progress pose={progressPose}>
        <div />
      </Progress>
    </Window>
  )
}

export default Instructions
