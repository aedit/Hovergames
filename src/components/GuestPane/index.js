import React from 'react'
import {
  Heading,
  Window,
  useFromToPose,
  Subtitle,
  Progress,
} from '../../ui-components'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

const randomString = setGuestid => {
  axios
    .get('/users/guest')
    .then(res => {
      const guestid = res.data.guest_id.substr(0, 5)
      localStorage.setItem('guestid', guestid)
      setGuestid(guestid)
    })
    .catch(() => {})
}

const GuestPane = React.memo(() => {
  const guestPose = useFromToPose(0.5, { from: 'hidden', to: 'visible' })

  const [progressPose, setProgress] = React.useState('empty')
  const [guestid, setGuestid] = React.useState('')
  const [redirect, setRedirect] = React.useState(false)
  React.useEffect(() => {
    randomString(setGuestid)
  }, [])
  React.useEffect(() => {
    if (progressPose === 'empty' && guestid) {
      setProgress('full')
    }
    if (progressPose === 'full') {
      setTimeout(() => setRedirect(true), 5000)
    }
  })
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
        <p>Please wait while we generate your guestid</p>
        <p>Back to Home</p>
      </div>
      <Progress pose={progressPose}>
        <div />
      </Progress>
    </Window>
  )
})

export default GuestPane
