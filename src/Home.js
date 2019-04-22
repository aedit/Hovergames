import React from 'react'
import {
  useFromToPose,
  Window,
  Heading,
  Subtitle,
  Footer
} from './ui-components'
import GuestPane from './components/GuestPane'
import LoginPane from './components/LoginPane'
import { Redirect } from 'react-router-dom'
import Authors from './components/Authors'
import { connect } from 'react-redux'
import About from './components/About'
import { startVideo, stop } from './tracker'
import { store } from './store'
import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  width: 210px;
  height: 210px;
  border-radius: 1em;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas:
    'empty up empty'
    'left empty right'
    'empty down empty';
`
const Icon = styled.div`
  background: white;
`

const Home = ({ ready, gesture }) => {
  // if (gesture !== '') console.log(gesture)
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
    if (ready) startVideo()
  }, [ready])
  React.useEffect(() => () => void stop(), [])
  const isLoggedIn = sessionStorage.hasOwnProperty('token')
  return isLoggedIn ? (
    <Redirect to="/dashboard" />
  ) : (
    <React.Fragment>
      {isScaleDown === 'right' && <GuestPane />}
      {isScaleDown === 'down' && <About />}
      <Window
        style={{
          clipPath:
            'polygon(0% 0%, 50% 4%, 100% 0%, 96% 50%, 100% 100%, 50% 96%, 0% 100%, 4% 50%)'
        }}
        pose={isScaleDown === 'center' ? windowPose : isScaleDown}
      >
        <Heading>
          Hover Games
          <Subtitle>
            Experience the gaming world with a <strong>hover</strong> of your
            palm.
          </Subtitle>
        </Heading>
        <Grid>
          <Icon style={{ gridArea: 'up' }}>UP</Icon>
          <Icon style={{ gridArea: 'down' }}>DOWN</Icon>
          <Icon style={{ gridArea: 'left' }}>LEFT</Icon>
          <Icon style={{ gridArea: 'right' }}>RIGHT</Icon>
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
    ...state
  }
}

export default connect(
  mapStateToProps,
  () => ({})
)(Home)
