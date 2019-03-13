import React from 'react'
import styled from 'styled-components'
import {Window, Heading} from '../../ui-components'

const GuideWindow = styled(Window)`
    grid-template-areas:
        'heading'
        'desc'
        'instruction'
        'instruction';
    grid-template-rows: 1fr 1fr 3fr;
    justify-items:center;
`
const Instruction = styled.section`
    grid-area:instruction;
`

const Desc = styled.article`
    width: 80%;
    grid-area: desc;
    text-align: justify;
`

const Guide = () => {
  return (
    <GuideWindow>
        <Heading>
            Guide
        </Heading>
        <Desc>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi quisquam corporis eius corrupti eligendi officiis esse iure provident repellat tempore non fugit obcaecati voluptates ipsum facere nemo possimus illo veritatis beatae, totam necessitatibus? Nemo iusto dolorum odit, ducimus velit optio inventore placeat eos, aliquid ut, modi provident laboriosam eveniet corporis.
        </Desc>
    </GuideWindow>
  )
}

export default Guide