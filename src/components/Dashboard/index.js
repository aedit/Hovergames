import React from 'react'
import { Window, useFromToPose } from '../../ui-components'

const Dashboard = () => {
  const windowPose = useFromToPose(0.3, { from: 'hidden', to: 'visible' })
  return <Window pose={windowPose}>Games</Window>
}

export default Dashboard
