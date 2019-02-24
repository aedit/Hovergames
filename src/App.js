import React from 'react'
import './App.css'

import SplitText from 'react-pose-text'
import { useFromToPose, Window, Heading, Subtitle } from './ui-components'

// const gestures = [
//   { id: 1, name: 'OPEN' },
//   { id: 2, name: 'CLOSE' },
//   { id: 3, name: 'MOVE' },
//   { id: 4, name: 'DRAG' },
//   { id: 5, name: 'CLICK' },
//   { id: 6, name: 'HOLD' },
//   { id: 7, name: 'SCROLL' },
//   { id: 8, name: 'PULLDOWN' },
//   { id: 9, name: 'BACK' },
// ]

const charPose = {
  enter: {
    scale: 1,
  },
  exit: {
    scale: 0,
  },
}

const App = () => {
  const windowPose = useFromToPose(1.5, { from: 'hidden', to: 'visible' })
  const charPoses = useFromToPose(10, { from: 'exit', to: 'enter' })
  return (
    <Window pose={windowPose}>
      <Heading>
        <SplitText charPoses={charPose} pose={charPoses}>
          Hover
        </SplitText>
        <Subtitle>something about "NAME"...</Subtitle>
      </Heading>
    </Window>
  )
}

export default App
