import React, { Component } from "react"
import styled from "styled-components"
import posed from "react-pose"
import "./App.css"

const W = posed.div({
  visible: {
    scale: 1,
  },
  hidden: {
    scale: 0,
  },
})

const Window = styled(W)`
  height: 90vh;
  width: 95vw;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: black;
  box-shadow: 0 0 100px rgba(255, 255, 255, 0.4);
`

const App = () => {
  const windowPose = useWindowPose(1.5)
  return (
    <Window pose={windowPose}>
      <h1>Hello, World!</h1>
    </Window>
  )
}

const useWindowPose = timeOut => {
  const [windowPose, setWindowPose] = React.useState("hidden")
  React.useEffect(
    () => void setTimeout(setWindowPose("visible"), timeOut * 1000),
    [],
  )
  return windowPose
}

export default App
