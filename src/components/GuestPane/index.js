import React from 'react'
import {
  Heading,
  Window,
  useFromToPose,
  Subtitle,
  LR,
  useFromToPoseInf,
  Progress
} from '../../ui-components'
import { CardBody, CardTitle, Card } from 'reactstrap'
import { Link } from 'react-router-dom'

const randomString = (length = 5) =>
  Math.random()
    .toString(36)
    .replace(/\W+/g, '')
    .substr(0, length)

const GuestPane = React.memo(() => {
  const guestPose = useFromToPose(0.5, { from: 'hidden', to: 'visible' })
  const L2R = useFromToPoseInf({ from: 'left', to: 'right' })
  const progressPose = useFromToPose(1, { from: 'empty', to: 'full' })
  const guestid = localStorage.hasOwnProperty('guestid')
    ? localStorage.getItem('guestid')
    : randomString()
  localStorage.setItem('guestid', guestid)

  return (
    <Window pose={guestPose} className="guest">
      <Heading>
        Welcome Guest!
        <Subtitle style={{ fontSize: '0.35em' }}>
          Your GuestID is <strong>{guestid}</strong>
        </Subtitle>
      </Heading>
      <Card className="options" style={{ gridArea: 'contd' }}>
        <LR pose={L2R}>
          <i className="far fa-hand-paper" />
        </LR>
        <CardBody>
          <CardTitle>
            <Link to="/guide">Hover to continue</Link>
          </CardTitle>
        </CardBody>
      </Card>
      <Progress pose={progressPose}>
        <div />
      </Progress>
    </Window>
  )
})

export default GuestPane
