import React from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
} from 'reactstrap'
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


// const gestures = [
//   { id: 1, name: 'OPEN' },
//   { id: 2, name: 'CLOSE' },
//   { id: 3, name: 'MOVE' },
//   { id: 4, name: 'DRAG' },
//   { id: 5, name: 'CLICK' },
//   { id: 6, name: 'HOLD' },
//   { id: 7, name: 'SCROLL' },
//   { id: 8, name: 'PULLDOWN' },
//   { id: 9, name: 'BACK' },
// ]

const App = () => {
  const windowPose = useFromToPose(1.5, { from: 'hidden', to: 'visible' })
  const L2R = useFromToPoseInf({ from: 'left', to: 'right' })
  const R2L = useFromToPoseInf({ from: 'right', to: 'left' })
  const [isScaleDown, setIsScaleDown] = React.useState(false)
  return (
    <React.Fragment>
      {isScaleDown && <GuestPane />}
    <Window pose={!isScaleDown ? windowPose : 'scaleDown'}>
      <Heading>
        Hover Games
        <Subtitle>Experience the gaming world with a <strong>hover</strong> of your palm.</Subtitle>
      </Heading>
      <Container>
        <Row style={{alignItems: 'center', height: '100%'}}>
        <Col />
          <Col onClick={() => setIsScaleDown(prev => !prev)}>
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
        Authors: <code>{'</ Vaibhav Bhawalkar >, </ Udit Sen >, </ Vinay Yadav >'}</code > 
      </Footer>
    </Window>
    </React.Fragment>
  )
}

export default App
