import React from 'react'
import {
  Heading,
  Window,
  useFromToPose,
  Subtitle,
  RL,
  useFromToPoseInf
} from '../../ui-components'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

const Login = (userid, password, setRedirect) => {
  axios
    .post('/users/reglog', {
      userid,
      password
    })
    .then(res => {
      if (!res.data.error) {
        sessionStorage.setItem('token', res.data.token)
        setRedirect(res.data.new ? 'guide' : 'dashboard')
      }
    })
    .catch(() => {})
}

const LoginPane = React.memo(() => {
  const [userid, setUserid] = React.useState('')
  const [password, setPassword] = React.useState('')
  const guestPose = useFromToPose(0.5, { from: 'hidden', to: 'visible' })
  const R2L = useFromToPoseInf({ from: 'right', to: 'left' })
  const [redirect, setRedirect] = React.useState('no')

  return redirect !== 'no' ? (
    <Redirect to={`/${redirect}`} />
  ) : (
    <Window pose={guestPose} className="guest right">
      <Heading>
        Welcome!
        <Subtitle style={{ fontSize: '0.35em' }}>
          Please wait while we log you in!
        </Subtitle>
      </Heading>
      <form
        className="loginform"
        onSubmit={e => {
          e.preventDefault()
          Login(userid, password, setRedirect)
        }}
      >
        <input
          autoFocus
          type="text"
          name="userid"
          placeholder="UserName"
          value={userid}
          onChange={e => setUserid(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input type="submit" value="login" />
      </form>
      <div className="options">
        <RL pose={R2L}>
          <i className="far fa-hand-paper" />
        </RL>
        <p>Hover to Login</p>
      </div>
    </Window>
  )
})

export default LoginPane
