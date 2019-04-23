import React from 'react'
import styled from 'styled-components'
import posed from 'react-pose'

// --------------------------------------------------------
//      Posed Components (DO NOT EXPORT)
// --------------------------------------------------------

const W = posed.div({
  visible: {
    x: '0%',
    y: '0',
    scale: 1,
    opacity: 1,
  },
  hidden: {
    x: '0%',
    y: '0',
    scale: 0,
    opacity: 0,
  },
  right: {
    x: '40%',
    y: '0',
    scale: 0.5,
    opacity: 0.9,
  },
  left: {
    x: '-40%',
    y: '0',
    scale: 0.5,
    opacity: 0.9,
  },
  up: {
    x: '0',
    y: '-100%',
    scale: 0.5,
    opacity: 0.9,
  },
  down: {
    y: '100%',
    scale: 0.5,
    opacity: 0.9,
  },
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

const ud = posed.div({
  up: {
    y: '-100%',
    opacity: 0,
  },
  down: {
    y: '0%',
    opacity: 1,
  },
})
const du = posed.div({
  up: {
    y: '-100%',
    opacity: 1,
  },
  down: {
    y: '100%',
    opacity: 0,
  },
})

const prog = posed.div({
  empty: {
    scaleX: 0,
  },
  full: {
    scaleX: 1,
    transition: { duration: 5000 },
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

const uddu = `min-height: 90vh;
width: 50vw;
max-width: 1100px;
color: white;
box-shadow: 0 0 100px 5px black;
background-color: #000000;
padding: 1em;
display: grid;
grid-template-rows: auto 15px 1fr;
grid-template-areas:
  'heading'
  'padding'
  'desc';
justify-items: center;
margin: 0 auto;
position: relative;
&::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border: 5px solid #6FFFE9;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 90%, 0% 100%);
}
`

export const UD = styled(ud)`
  ${uddu}
`
export const DU = styled(du)`
  ${uddu}
`
export const Progress = styled(prog)`
  grid-area: progress;
  width: 100%;
  height: 10px;
  padding: 1px;
  & > div {
    background: #7afdd6;
    height: 100%;
    transform-origin: left;
  }
`

export const Window = styled(W)`
  min-height: 90vh;
  width: 95vw;
  max-width: 1100px;
  border-radius: 10px;
  color: white;
  box-shadow: 0 0 100px black;
  background-color: #000;
  padding: 1em;
  display: grid;
  grid-template-rows: 2fr 20px 320px 50px;
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
  text-shadow: 0 0 13px #7afdd6;
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
  font-size: 0.25em;
  font-weight: 100;
  text-shadow: none;
  strong {
    font-weight: 900;
    text-transform: uppercase;
  }
`

export const Desc = styled.article`
  width: 80%;
  grid-area: desc;
  text-align: justify;
`

export const Seperation = styled.h3`
  align-self: center;
  grid-area: seperation;
  text-align: center;
  padding-bottom: 1rem;
`

// export const List = styled.ul`
//   overflow-y: scroll;
//   grid-area: list;
//   list-style: none;
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//   grid-gap: 10px;
//   li {
//     display: flex;
//     min-height: 150px;
//     justify-content: center;
//     align-items: center;
//     padding: 1em 1.5em;
//     border-radius: 5px;
//     background-color: #663dff;
//     background-image: linear-gradient(
//       319deg,
//       #663dff 0%,
//       #aa00ff 37%,
//       #cc4499 100%
//     );
//   }
// `

export const Grid = styled.div`
  display: grid;
  width: 210px;
  height: 210px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  align-self: center;
  justify-self: center;
`

export const Icon = styled.div`
  background: transparent;
  color: #7afdd6;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

// --------------------------------------------------------
//      Custom Hooks for Posed Components (DO EXPORT)
// --------------------------------------------------------

export const useFromToPose = (timeOut, { from, to }) => {
  const [windowPose, setWindowPose] = React.useState(from)
  const si = () => setWindowPose(to)
  React.useEffect(() => {
    setTimeout(si, timeOut * 1000)
    return () => void clearTimeout(si)
  }, [])
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

export const useTime = condition => {
  let [timeElapsed, setTimeElapsed] = React.useState(0)
  const s = () => setTimeElapsed(t => t + 1)
  React.useEffect(() => {
    if (condition) {
      setInterval(s, 1000)
    }
    return () => void clearInterval(s)
  }, [condition])
  return [timeElapsed, setTimeElapsed]
}
