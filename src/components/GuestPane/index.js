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
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
const randomString = async () => {
  await axios.get('http://localhost:5000/users/guest').then(res => {
    if(!res.data.error) {
      localStorage.setItem('guestid', res.data.guestid)
    }
  }).catch(()=> {})
  return localStorage.getItem('guestid')
}

const GuestPane = React.memo(() => {
  const guestPose = useFromToPose(0.5, { from: 'hidden', to: 'visible' })
  const L2R = useFromToPoseInf({ from: 'left', to: 'right' })
  const progressPose = useFromToPose(1, { from: 'empty', to: 'full' })
  const guestid = localStorage.hasOwnProperty('guestid')
    ? localStorage.getItem('guestid')
    : randomString()
  localStorage.setItem('guestid', guestid)
  const [redirect, setRedirect] = React.useState(false)
  React.useEffect(() => {
    if (progressPose === 'full') setTimeout(() => setRedirect(true), 7000)
  }, [progressPose])
  return redirect === true ? (
    <Redirect to="/guide" />
  ) : (
    <Window pose={guestPose} className="guest">
      <Heading>
        Welcome Guest!
        <Subtitle style={{ fontSize: '0.35em' }}>
          Your GuestID is <strong>{guestid}</strong>
        </Subtitle>
      </Heading>
      <div className="options" style={{ gridArea: 'contd' }}>
        <LR pose={L2R}>
          <i className="far fa-hand-paper" />
        </LR>
        <Link to="/guide">Hover to continue</Link>
      </div>
      <Progress pose={progressPose}>
        <div />
      </Progress>
    </Window>
  )
})

export default GuestPane
