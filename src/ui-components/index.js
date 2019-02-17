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
    scale: 0.5,
    opacity: 0,
  },
})

// --------------------------------------------------------
//      Styled Components (DO EXPORT)
// --------------------------------------------------------

export const Window = styled(W)`
  height: 90vh;
  width: 95vw;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  transform-origin: 20% 50%;
  box-shadow: 0 0 100px black;
  background-color: #000000;
`

// --------------------------------------------------------
//      Custom Hooks for Posed Components (DO EXPORT)
// --------------------------------------------------------

export const useFromToPose = (timeOut, { from, to }) => {
  const [windowPose, setWindowPose] = React.useState(from)
  React.useEffect(() => setWindowPose(to), [])
  return windowPose
}
