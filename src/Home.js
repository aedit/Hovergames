import React from 'react'
import {
  useFromToPose,
  Window,
  Heading,
  Subtitle,
  Footer,
  Grid,
  Icon,
} from './ui-components'
import GuestPane from './components/GuestPane'
import LoginPane from './components/LoginPane'
import { Redirect } from 'react-router-dom'
import Authors from './components/Authors'
import Spinner from './components/Spinner'
import { connect } from 'react-redux'
import About from './components/About'
import { startVideo, stop } from './tracker'
import { store } from './store'

const Home = ({ ready, gesture }) => {
  const [showSpinner, setShowSpinner] = React.useState(true)
  const windowPose = useFromToPose(0.3, { from: 'hidden', to: 'visible' })

  const [isScaleDown, setIsScaleDown] = React.useState('center')
  React.useEffect(() => {
    let f = true
    const n = gesture + isScaleDown
    switch (n) {
      case 'leftright':
      case 'rightleft':
      case 'updown':
      case 'downup':
        store.dispatch({ type: 'reset' })
        f = false
        break
      case 'upleft':
      case 'upright':
      case 'downright':
      case 'downleft':
      case 'leftup':
      case 'leftdown':
      case 'rightup':
      case 'rightdown':
      case 'upstop':
      case 'downstop':
      case 'leftstop':
      case 'rightstop':
        f = false
        break
      default:
        break
    }

    if (f && gesture !== isScaleDown) {
      setIsScaleDown(gesture === '' ? 'center' : gesture)
    }
  }, [gesture])
  React.useEffect(() => {
    if (ready) {
      startVideo()
      setShowSpinner(false)
    }
  }, [ready])
  React.useEffect(() => {
    if (isScaleDown === 'right') {
      store.dispatch({ type: 'guest', payload: { guest: true } })
    } else {
      store.dispatch({ type: 'guest', payload: { guest: false } })
    }
  }, [isScaleDown])
  React.useEffect(() => () => void stop(), [])
  const isLoggedIn = sessionStorage.hasOwnProperty('token')
  return isLoggedIn ? (
    <Redirect to="/dashboard" />
  ) : showSpinner ? (
    <Spinner />
  ) : (
    <React.Fragment>
      {isScaleDown === 'right' && <GuestPane />}
      {isScaleDown === 'down' && <About />}
      <Window
        style={{
          clipPath:
            'polygon(0% 0%, 50% 4%, 100% 0%, 96% 50%, 100% 100%, 50% 96%, 0% 100%, 4% 50%)',
        }}
        pose={isScaleDown === 'center' ? windowPose : isScaleDown}>
        <Heading>
          Hover Games
          <Subtitle>
            Experience the gaming world with a <strong>hover</strong> of your
            palm.
          </Subtitle>
        </Heading>
        <Grid
          style={{
            gridArea: 'list',
          }}>
          <Icon style={{ gridColumn: '2', gridRow: '1' }}>
            <i class="fas fa-arrow-up" />
            UP
          </Icon>
          <Icon style={{ gridColumn: '2', gridRow: '3' }}>
            <i class="fas fa-arrow-down" />
            DOWN
          </Icon>
          <Icon style={{ gridColumn: '1', gridRow: '2' }}>
            <i class="fas fa-arrow-left" />
            LEFT
          </Icon>
          <Icon style={{ gridColumn: '3', gridRow: '2' }}>
            <i class="fas fa-arrow-right" />
            RIGHT
          </Icon>
        </Grid>
        <Footer>
          <strong>Authors:</strong>{' '}
          <code>
            {'</ Vaibhav Bhawalkar >, </ Udit Sen >, </ Vinay Yadav >'}
          </code>
        </Footer>
      </Window>
      {isScaleDown === 'left' && <LoginPane />}
      {isScaleDown === 'up' && <Authors />}
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    ...state,
  }
}

export default connect(
  mapStateToProps,
  () => ({}),
)(Home)
