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
    'empty'
    'instruction'
    'instruction'
    'progress';
  grid-template-rows: 1fr 1fr 50px 2fr 2fr 20px;
  justify-items: center;
  overflow: hidden;
`

const Guide = () => {
  const windowPose = useFromToPose(0.3, { from: 'hidden', to: 'visible' })
  const progressPose = useFromToPose(1, { from: 'empty', to: 'full' })
  const [redirect, setRedirect] = React.useState(false)
  store.dispatch({ type: 'reset' })
  React.useEffect(() => {
    if (progressPose === 'full') setTimeout(() => setRedirect(true), 7000)
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
      <Heading>Guide</Heading>
      <Desc>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
        quisquam corporis eius corrupti eligendi officiis esse iure provident
        repellat tempore non fugit obcaecati voluptates ipsum facere nemo
        possimus illo veritatis beatae, totam necessitatibus? Nemo iusto dolorum
        odit, ducimus velit optio inventore placeat eos, aliquid ut, modi
        provident laboriosam eveniet corporis.
      </Desc>
      <Grid
        style={{ gridArea: 'instruction', width: '420px', height: '420px' }}>
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
          Verical
        </Icon>
        <Icon style={{ gridColumn: '3', gridRow: '1' }}>
          <div style={{ display: 'flex' }}>
            <i class="fas fa-arrow-left" />
            <i class="fas fa-arrow-right" />
          </div>
          Open
        </Icon>
        <Icon style={{ gridColumn: '1', gridRow: '3' }}>
          <div style={{ display: 'flex' }}>
            <i class="fas fa-arrow-right" />
            <i class="fas fa-arrow-left" />
          </div>
          Close
        </Icon>
        <Icon style={{ gridColumn: '3', gridRow: '3' }}>
          <i class="fas fa-arrows-alt-h" />
          Horizontal
        </Icon>
      </Grid>
      <Progress pose={progressPose}>
        <div />
      </Progress>
    </GuideWindow>
  )
}

export default Guide
