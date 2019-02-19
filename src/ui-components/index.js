import React from "react";
import styled from "styled-components";
import posed from "react-pose";

// --------------------------------------------------------
//      Posed Components (DO NOT EXPORT)
// --------------------------------------------------------

const W = posed.div({
  visible: {
    scale: 1,
    opacity: 1
  },
  hidden: {
    scale: 0.5,
    opacity: 0
  }
});

// --------------------------------------------------------
//      Styled Components (DO EXPORT)
// --------------------------------------------------------

export const Window = styled(W)`
  min-height: 90vh;
  width: 95vw;
  max-width: 1100px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  transform-origin: 20% 50%;
  box-shadow: 0 0 100px black;
  background-color: #000000;
  flex-direction: column;
  position: relative;
  h1 {
    white-space: nowrap;
    width: 80%;
    height: 20%;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 5px solid whitesmoke;
    padding-bottom: 2.6em;
  }
  span {
    margin-top: 1.4em;
    font-size: 0.5em;
  }
  h2 {
    position: absolute;
    // top: -2.6em;
    top: calc(45%);
    background: black;
    padding: 0.5em 1em;
  }
`;

export const List = styled.ul`
  margin-top: 1em;
  height: 40%;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 60px);
  grid-gap: 10px;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  z-index: 999;
  width: 80%;
  li {
    text-align: center;
    padding: 1em 1.5em;
    // border: 2px solid currentColor;
    border-radius: 5px;
    background-color: #663dff;
    background-image: linear-gradient(
      319deg,
      #663dff 0%,
      #aa00ff 37%,
      #cc4499 100%
    );
  }
`;

// --------------------------------------------------------
//      Custom Hooks for Posed Components (DO EXPORT)
// --------------------------------------------------------

export const useFromToPose = (timeOut, { from, to }) => {
  const [windowPose, setWindowPose] = React.useState(from);
  React.useEffect(() => setWindowPose(to), []);
  return windowPose;
};
