import React from 'react'
import {
  Heading,
  Window,
  useFromToPose,
  Subtitle,
  RL,
  Progress,
  useFromToPoseInf
} from '../../ui-components'
import { CardBody, CardTitle, Card } from 'reactstrap'
import { Webcam } from 'react-webcam'
import ErrorBoundary from '../../ErrorBoundary'
import { Redirect } from 'react-router-dom'

const Xyz = () => <Webcam />

const randomString = (length = 5) =>
  Math.random()
    .toString(36)
    .replace(/\W+/g, '')
    .substr(0, length)

const UserPane = React.memo(() => {
  const guestPose = useFromToPose(0.5, { from: 'hidden', to: 'visible' })
  const R2L = useFromToPoseInf({ from: 'right', to: 'left' })
  const progressPose = useFromToPose(1, { from: 'empty', to: 'full' })
  const [redirect, setRedirect] = React.useState(false)
  const guestid = localStorage.hasOwnProperty('guestid')
    ? localStorage.getItem('guestid')
    : randomString()
  localStorage.setItem('guestid', guestid)
  React.useEffect(() => {
    if (progressPose === 'full') setTimeout(() => setRedirect(true), 7000)
  }, [progressPose])
  return redirect === true ? (
    <Redirect to="/dashboard" />
  ) : (
    <Window pose={guestPose} className="guest right">
      <Heading>
        Welcome back
        <Subtitle style={{ fontSize: '0.35em' }}>
          Please wait while we recognize you!
        </Subtitle>
      </Heading>
      {/* {<ErrorBoundary>
        <Xyz style={{ gridArea: 'video' }} />
      </ErrorBoundary>} */}
      <Heading style={{ gridArea: 'video', fontSize: '1.3rem' }}>
        Oops! Something Went Wrong!
        <br />
        Your GuestID is <strong>{guestid}</strong>
        <br />
        Logging you in as a guest!
      </Heading>

      <Card className="options" style={{ gridArea: 'contd' }}>
        <RL pose={R2L}>
          <i className="far fa-hand-paper" />
        </RL>
        <CardBody>
          <CardTitle>Hover to continue</CardTitle>
        </CardBody>
      </Card>
      <Progress pose={progressPose}>
        <div />
      </Progress>
    </Window>
  )
})

export default UserPane
