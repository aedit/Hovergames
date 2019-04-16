import React from 'react'
import { Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap'
import {
  useFromToPose,
  useFromToPoseInf,
  Window,
  Heading,
  Subtitle,
  LR,
  RL,
  Footer
} from './ui-components'
import GuestPane from './components/GuestPane'
import UserPane from './components/UserPane'
import { Redirect } from 'react-router-dom'
import Authors from './components/Authors'
import { connect } from 'react-redux'
import About from './components/About'
import { startVideo, stop } from './tracker'
import { store } from './store'

const Home = ({ ready, gesture }) => {
  // if (gesture !== '') console.log(gesture)
  const windowPose = useFromToPose(0.3, { from: 'hidden', to: 'visible' })
  const L2R = useFromToPoseInf({ from: 'left', to: 'right' })
  const R2L = useFromToPoseInf({ from: 'right', to: 'left' })
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
        <Container>
          <Row style={{ alignItems: 'center', height: '100%' }}>
            <Col />
            <Col>
              <Card className="options">
                <LR pose={L2R}>
                  <i className="far fa-hand-paper" />
                </LR>
                <CardBody>
                  <CardTitle>Guest</CardTitle>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card className="options">
                <RL pose={R2L}>
                  <i className="far fa-hand-paper" />
                </RL>
                <CardBody>
                  <CardTitle>Log-in/Sign-up</CardTitle>
                </CardBody>
              </Card>
            </Col>
            <Col />
          </Row>
        </Container>
        <Footer>
          <strong>Authors:</strong>{' '}
          <code>
            {'</ Vaibhav Bhawalkar >, </ Udit Sen >, </ Vinay Yadav >'}
          </code>
        </Footer>
      </Window>
      {isScaleDown === 'left' && <UserPane />}
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
