import React from 'react'
import styled from 'styled-components'
import posed from 'react-pose'

// --------------------------------------------------------
//      Posed Components (DO NOT EXPORT)
// --------------------------------------------------------

const W = posed.div({
  visible: {
    x: '0%',
    scale: 1,
    opacity: 1,
  },
  hidden: {
    scale: 0,
    opacity: 0,
  },
  scaleDown: {
    x: '25%',
    scale: 0.5,
    opacity: 0.9
  }
})

const lr = posed.div({
  left: {
    x: '-100%',
    opacity: 1,
  },
  right: {
    x: '100%',
    opacity: 0,
  },
})
const rl = posed.div({
  left: {
    x: '-100%',
    opacity: 0,
  },
  right: {
    x: '100%',
    opacity: 1,
  },
})

// --------------------------------------------------------
//      Styled Components (DO EXPORT)
// --------------------------------------------------------

export const LR = styled(lr)`
  font-size: 2em;
`
export const RL = styled(rl)`
  font-size: 2em;
`

export const Window = styled(W)`
  min-height: 90vh;
  width: 95vw;
  max-width: 1100px;
  border-radius: 10px;
  color: white;
  transform-origin: 20% 50%;
  box-shadow: 0 0 100px black;
  background-color: #000000;
  padding: 1em;
  display: grid;
  grid-template-rows: 2fr 320px;
  grid-template-areas:
    'heading'
    'seperation'
    'list'
    'footer';
`

export const Heading = styled.h1`
  font-size: 4rem;
  align-self: center;
  grid-area: heading;
  display: flex;
  flex-direction: column;
  text-align: center;
  letter-spacing: 2px;
  align-self: end;
`
export const Footer = styled.h6`
  font-size: 1rem;
  grid-area: footer;
  text-align: center;
  letter-spacing: 1px;
  color: whitesmoke;
`

export const Subtitle = styled.span`
  margin-top: 1em;
  font-size: 0.2em;
  font-weight: 100;
  strong {
    font-weight: 900;
    text-transform: uppercase;
  }
`

export const Saperation = styled.h3`
  align-self: center;
  grid-area: seperation;
  text-align: center;
  padding-bottom: 1rem;
`

export const List = styled.ul`
  overflow-y: scroll;
  grid-area: list;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 10px;
  li {
    display: flex;
    min-height: 150px;
    justify-content: center;
    align-items: center;
    padding: 1em 1.5em;
    border-radius: 5px;
    background-color: #663dff;
    background-image: linear-gradient(
      319deg,
      #663dff 0%,
      #aa00ff 37%,
      #cc4499 100%
    );
  }
`

// --------------------------------------------------------
//      Custom Hooks for Posed Components (DO EXPORT)
// --------------------------------------------------------

export const useFromToPose = (timeOut, { from, to }) => {
  const [windowPose, setWindowPose] = React.useState(from)
  React.useEffect(() => setWindowPose(to), [])
  return windowPose
}

export const useFromToPoseInf = ({ from, to }) => {
  const [val, setval] = React.useState(from)
  const si = () => setval(val === from ? to : from)
  React.useEffect(() => {
    setTimeout(si, 1000)
    return () => void clearTimeout(si)
  })
  return val
}
