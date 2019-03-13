import React from 'react'
import styled from 'styled-components'
import { Heading, Window, Progress, useFromToPose } from '../../ui-components'
import { CardBody, CardTitle, Card } from 'reactstrap'
import { Redirect } from 'react-router-dom'
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
const Instruction = styled.section`
  grid-area: instruction;
  display: flex;
  flex-wrap: wrap;
  & article {
    flex-basis: 50%;
    text-align: center;
  }
`

const Desc = styled.article`
  width: 80%;
  grid-area: desc;
  text-align: justify;
`
const Guide = () => {
  const windowPose = useFromToPose(0.3, { from: 'hidden', to: 'visible' })
  const progressPose = useFromToPose(1, { from: 'empty', to: 'full' })
  const [redirect, setRedirect] = React.useState(false)
  React.useEffect(() => {
    if (progressPose === 'full') setTimeout(() => setRedirect(true), 7000)
  }, [progressPose])
  return redirect === true ? (
    <Redirect to="/dashboard" />
  ) : (
    <GuideWindow pose={windowPose}>
      <Heading>Guide</Heading>
      <Desc>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
        quisquam corporis eius corrupti eligendi officiis esse iure provident
        repellat tempore non fugit obcaecati voluptates ipsum facere nemo
        possimus illo veritatis beatae, totam necessitatibus? Nemo iusto dolorum
        odit, ducimus velit optio inventore placeat eos, aliquid ut, modi
        provident laboriosam eveniet corporis.
      </Desc>
      <Instruction>
        <article>
          <Card className="options" style={{ gridArea: 'contd' }}>
            <i className="far fa-hand-paper" />
            <CardBody>
              <CardTitle>RIGHT</CardTitle>
            </CardBody>
          </Card>
        </article>
        <article>
          <Card className="options" style={{ gridArea: 'contd' }}>
            <i className="far fa-hand-paper" />
            <CardBody>
              <CardTitle>DOWN</CardTitle>
            </CardBody>
          </Card>
        </article>
        <article>
          <Card className="options" style={{ gridArea: 'contd' }}>
            <i className="far fa-hand-paper" />
            <CardBody>
              <CardTitle>UP</CardTitle>
            </CardBody>
          </Card>
        </article>
        <article>
          <Card className="options" style={{ gridArea: 'contd' }}>
            <i className="far fa-hand-paper" />
            <CardBody>
              <CardTitle>LEFT</CardTitle>
            </CardBody>
          </Card>
        </article>
        <article>
          <Card className="options" style={{ gridArea: 'contd' }}>
            <i className="far fa-hand-paper" />
            <CardBody>
              <CardTitle>OPEN</CardTitle>
            </CardBody>
          </Card>
        </article>
        <article>
          <Card className="options" style={{ gridArea: 'contd' }}>
            <i className="far fa-hand-paper" />
            <CardBody>
              <CardTitle>CLOSE</CardTitle>
            </CardBody>
          </Card>
        </article>
      </Instruction>
      <Progress pose={progressPose}>
        <div />
      </Progress>
    </GuideWindow>
  )
}

export default Guide
