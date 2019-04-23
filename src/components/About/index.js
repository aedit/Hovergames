import React from 'react'
import { Heading, Desc, UD } from '../../ui-components'
// import { Link } from 'react-router-dom'

export const useFromToPose = (timeOut, { from, to }) => {
  const [windowPose, setWindowPose] = React.useState(from)
  const si = () => setWindowPose(to)
  React.useEffect(() => {
    setTimeout(si, timeOut * 1000)
    return () => void clearTimeout(si)
  }, [])
  return [windowPose, setWindowPose]
}

const About = ({ informUp }) => {
  const [upDownPose, setUpDown] = useFromToPose(0.3, { from: 'up', to: 'down' })

  return (
    <UD
      onClick={() => {
        setUpDown('up')
        informUp()
      }}
      pose={upDownPose}
      style={{
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 90%, 0% 100%)',
      }}>
      <Heading style={{ gridArea: 'heading' }}>About Page</Heading>
      <Desc>
        HOVER Games is a Unique Game Playing platform where game enthusiasts are
        provided with a new feature of experienceing the gaming world. HOVER
        Games is completely designed to respond based only on your hand
        gestures. At HOVER Games, you wouldnt need to use your keyboard or
        mouse, for anything unless you are a registered user. With game playing,
        the whole platform responses to player's gestures as well. It currently
        supports eight uniquley identified hand moments viz.
        <ol style={{ padding: '1.5em' }}>
          <li>Up Gesture</li>
          <li>Down Gesture</li>
          <li>Left Gesture</li>
          <li>Right Gesture</li>
          <li>Open Gesture</li>
          <li>Close Gesture</li>
          <li>Horizontal Concurrent Motion</li>
          <li>Vertical Concurrent Motion</li>
        </ol>
        <hr />
        <h5>You have a whole new world in your palm.</h5>
        <strong style={{ textAlign: 'right', width: '100%' }}>
          More Updates Coming Soon
        </strong>
      </Desc>
    </UD>
  )
}

export default About
