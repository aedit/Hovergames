import React from 'react'
import { Window, useFromToPose, Heading } from '../../ui-components'
import Game from '../Game'

const Dashboard = () => {
  const windowPose = useFromToPose(0.3, { from: 'hidden', to: 'visible' })
  return (
    <Window pose={windowPose}>
      <Heading>Dashboard</Heading>
      <div style={{ gridArea: 'list' }}>
        <Game />
        <Game />
        <Game /> 
      </div>
    </Window>
  )
}

export default Dashboard
