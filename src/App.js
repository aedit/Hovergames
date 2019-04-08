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
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Guide from './components/Guide'
import Dashboard from './components/Dashboard'
import About from './components/About'
import Authors from './components/Authors'
import Play from './components/Play'

const Home = () => {
  const windowPose = useFromToPose(0.3, { from: 'hidden', to: 'visible' })
  const L2R = useFromToPoseInf({ from: 'left', to: 'right' })
  const R2L = useFromToPoseInf({ from: 'right', to: 'left' })
  const [isScaleDown, setIsScaleDown] = React.useState('center')
  const isLoggedIn = sessionStorage.hasOwnProperty('token')
  return isLoggedIn ? (
    <Redirect to="/dashboard" />
  ) : (
    <React.Fragment>
      {isScaleDown === 'right' && <GuestPane />}
      {isScaleDown === 'down' && (
        <About informUp={() => setIsScaleDown('center')} />
      )}
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
            Experience the gaming world with a{' '}
            <span
              onClick={() => {
                setIsScaleDown(prev => (prev === 'down' ? 'center' : 'down'))
              }}
            >
              <strong>hover</strong>
            </span>{' '}
            of your palm.
          </Subtitle>
        </Heading>
        <Container>
          <Row style={{ alignItems: 'center', height: '100%' }}>
            <Col />
            <Col
              onClick={() =>
                setIsScaleDown(prev => (prev === 'right' ? 'center' : 'right'))
              }
            >
              <Card className="options">
                <LR pose={L2R}>
                  <i className="far fa-hand-paper" />
                </LR>
                <CardBody>
                  <CardTitle>Guest</CardTitle>
                </CardBody>
              </Card>
            </Col>
            <Col
              onClick={() =>
                setIsScaleDown(prev => (prev === 'left' ? 'center' : 'left'))
              }
            >
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
          <span
            onClick={() => {
              setIsScaleDown(prev => (prev === 'up' ? 'center' : 'up'))
            }}
          >
            Authors:
          </span>{' '}
          <code>
            {'</ Vaibhav Bhawalkar >, </ Udit Sen >, </ Vinay Yadav >'}
          </code>
        </Footer>
      </Window>
      {isScaleDown === 'left' && <UserPane />}
      {isScaleDown === 'up' && (
        <Authors informUp={() => setIsScaleDown('center')} />
      )}
    </React.Fragment>
  )
}

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/guide" component={Guide} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/about" component={About} />
      <Route path="/Game1" component={Play} />
      <Route path="/Game2" component={Play} />
      <Route path="/Game3" component={Play} />
    </Switch>
  </BrowserRouter>
)

export default App
