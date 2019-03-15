import React from 'react'
import { Heading, Desc, DU } from '../../ui-components'
import Profile from '../Profile'

export const useFromToPose = (timeOut, { from, to }) => {
  const [windowPose, setWindowPose] = React.useState(from)
  const si = () => setWindowPose(to)
  React.useEffect(() => {
    setTimeout(si, timeOut * 1000)
    return () => void clearTimeout(si)
  }, [])
  return [windowPose, setWindowPose]
}

const Authors = ({ informUp }) => {
  const [upDownPose, setUpDown] = useFromToPose(0.3, { from: 'down', to: 'up' })

  return (
    <DU
      onClick={() => {
        setUpDown('down')
        informUp()
      }}
      pose={upDownPose}
      style={{
        width: '80vw',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 90%, 0% 100%)'
      }}
    >
      <Heading style={{ gridArea: 'heading' }}>Authors</Heading>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          gridArea: 'desc',
          width: '90%'
        }}
      >
        <Profile name={'Udit'} dp={'hello'} description={'hello'} />
        <Profile name={'Vaibhav'} dp={'hello'} description={'hello'} />
        <Profile name={'Vinay'} dp={'hello'} description={'hello'} />
      </div>
    </DU>
  )
}

export default Authors
