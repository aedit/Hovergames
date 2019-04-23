import React from 'react'
import { Heading, Desc, UD } from '../../ui-components'
// import { Redirect } from 'react-router-dom'

export const useFromToPose = (timeOut, { from, to }) => {
  const [windowPose, setWindowPose] = React.useState(from)
  const si = () => setWindowPose(to)
  React.useEffect(() => {
    setTimeout(si, timeOut * 1000)
    return () => void clearTimeout(si)
  }, [])
  return [windowPose, setWindowPose]
}

const Leaderboard = ({ informUp }) => {
  const [upDownPose, setUpDown] = useFromToPose(0.3, { from: 'up', to: 'down' })
  return (
    <UD
      onClick={() => {
        setUpDown('up')
        informUp()
      }}
      pose={upDownPose}
      style={{
        width: '80vw',
      }}>
      <Heading style={{ gridArea: 'heading' }}>Leaderboard</Heading>
      <Desc>
        <ul>
          <li>Some random text</li>
          <li>Some random text</li>
          <li>Some random text</li>
          <li>Some random text</li>
          <li>Some random text</li>
          <li>Some random text</li>
          <li>Some random text</li>
          <li>Some random text</li>
          <li>Some random text</li>
          <li>Some random text</li>
        </ul>
      </Desc>
    </UD>
  )
}

export default Leaderboard
