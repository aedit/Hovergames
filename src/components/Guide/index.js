import React from 'react'
import styled from 'styled-components'
import {
  Heading,
  Window,
  Progress,
  useFromToPose,
  Desc,
  Icon,
  Grid,
} from '../../ui-components'
import { Redirect } from 'react-router-dom'
import { store } from '../../store'

const GuideWindow = styled(Window)`
  grid-template-areas:
    'heading'
    'desc'
    'instruction'
    'instruction'
    'progress';
  grid-template-rows: 1fr 1fr 2fr 2fr 20px;
  justify-items: center;
  overflow: hidden;
`

const Guide = () => {
  const windowPose = useFromToPose(0.3, { from: 'hidden', to: 'visible' })
  const progressPose = useFromToPose(1, { from: 'empty', to: 'full' })
  const [redirect, setRedirect] = React.useState(false)
  store.dispatch({ type: 'reset' })
  React.useEffect(() => {
    if (progressPose === 'full') setTimeout(() => setRedirect(true), 15000)
  }, [progressPose])
  const isLoggedin =
    localStorage.hasOwnProperty('token') ||
    localStorage.hasOwnProperty('guestid')
  return !isLoggedin ? (
    <Redirect to="/" />
  ) : redirect === true ? (
    <Redirect to="/dashboard" />
  ) : (
    <GuideWindow pose={windowPose}>
      {/* {store.dispatch({ type: 'reset' })} */}
      <Heading style={{ fontSize: '3rem' }}>Guide</Heading>
      <Desc style={{ textAlign: 'center' }}>
        Wave your hand from the center to the respected direction in order to
        initiate a gesture.
        <br />
        Open gesture works on holding both hands in the centre and moving them
        horizontally apart.
        <br />
        Close gesture works on holding both hands apart and moving them
        horizontally close towards centre.
        <br />
        Horizontal and Verical Concurrent Moments are synchronized with the
        hover position.
      </Desc>
      <Grid
        className="gesture-grid"
        style={{ gridArea: 'instruction', width: '350px', height: '350px' }}>
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
        <Icon style={{ gridColumn: '1', gridRow: '1' }}>
          <i class="fas fa-arrows-alt-v" />
          VERTICAL
        </Icon>
        <Icon style={{ gridColumn: '3', gridRow: '1' }}>
          <div style={{ display: 'flex' }}>
            <i class="fas fa-arrow-left" />
            <i class="fas fa-arrow-right" />
          </div>
          OPEN
        </Icon>
        <Icon style={{ gridColumn: '1', gridRow: '3' }}>
          <div style={{ display: 'flex' }}>
            <i class="fas fa-arrow-right" />
            <i class="fas fa-arrow-left" />
          </div>
          CLOSE
        </Icon>
        <Icon style={{ gridColumn: '3', gridRow: '3' }}>
          <i class="fas fa-arrows-alt-h" />
          HORIZONTAL
        </Icon>
        <Icon
          style={{
            gridColumn: '2',
            gridRow: '2',
            backgroundColor: '#252525',
            color: 'white',
            fontSize: '1.5em',
          }}>
          <i class="fas fa-hand-spock" />
          GESTURES
        </Icon>
      </Grid>
      <Progress pose={progressPose}>
        <div />
      </Progress>
    </GuideWindow>
  )
}

export default Guide
