import React from 'react'
import styled from 'styled-components'
import posed from 'react-pose'

// --------------------------------------------------------
//      Posed Components (DO NOT EXPORT)
// --------------------------------------------------------

const W = posed.div({
  visible: {
    scale: 1,
    opacity: 1,
  },
  hidden: {
    scale: 0,
    opacity: 0,
  },
})

// --------------------------------------------------------
//      Styled Components (DO EXPORT)
// --------------------------------------------------------

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
    'list';
`

export const Heading = styled.h1`
  font-size: 4rem;
  align-self: center;
  grid-area: heading;
  display: flex;
  flex-direction: column;
  text-align: center;
`

export const Subtitle = styled.span`
  font-size: 0.4em;
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
    background-image: linear-gradient(319deg, #663dff 0%, #aa00ff 37%, #cc4499 100%);
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
