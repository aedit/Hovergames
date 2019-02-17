import React from 'react'

import './App.css'
import { useFromToPose, Window } from './ui-components'

const App = () => {
  const windowPose = useFromToPose(1.5, { from: 'hidden', to: 'visible' })
  return (
    <Window pose={windowPose}>
      <h1>Hello, World!</h1>
    </Window>
  )
}

export default App
