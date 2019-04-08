import React from "react";
import styled from "styled-components";
import {
  Heading,
  Window,
  Progress,
  useFromToPose,
  Desc
} from "../../ui-components";
import { Redirect } from "react-router-dom";

const GuideWindow = styled(Window)`
  grid-template-areas:
    "heading"
    "desc"
    "empty"
    "instruction"
    "instruction"
    "progress";
  grid-template-rows: 1fr 1fr 50px 2fr 2fr 20px;
  justify-items: center;
  overflow: hidden;
`;
const Instruction = styled.section`
  grid-area: instruction;
  display: flex;
  flex-wrap: wrap;
  & article {
    flex-basis: 50%;
    text-align: center;
  }
`;

const Guide = () => {
  const windowPose = useFromToPose(0.3, { from: "hidden", to: "visible" });
  const progressPose = useFromToPose(1, { from: "empty", to: "full" });
  const [redirect, setRedirect] = React.useState(false);
  React.useEffect(() => {
    if (progressPose === "full") setTimeout(() => setRedirect(true), 7000);
  }, [progressPose]);
  const isLoggedin =
    sessionStorage.hasOwnProperty("token") ||
    sessionStorage.hasOwnProperty("guestid");
  return !isLoggedin ? (
    <Redirect to="/" />
  ) : redirect === true ? (
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
          <div className="options" style={{ gridArea: "contd" }}>
            <i className="far fa-hand-paper" />
            XYZ
          </div>
        </article>
        <article>
          <div className="options" style={{ gridArea: "contd" }}>
            <i className="far fa-hand-paper" />
            XYZ
          </div>
        </article>
        <article>
          <div className="options" style={{ gridArea: "contd" }}>
            <i className="far fa-hand-paper" />
            XYZ
          </div>
        </article>
        <article>
          <div className="options" style={{ gridArea: "contd" }}>
            <i className="far fa-hand-paper" />
            XYZ
          </div>
        </article>
        <article>
          <div className="options" style={{ gridArea: "contd" }}>
            <i className="far fa-hand-paper" />
            XYZ
          </div>
        </article>
        <article>
          <div className="options" style={{ gridArea: "contd" }}>
            <i className="far fa-hand-paper" />
            XYZ
          </div>
        </article>
      </Instruction>
      <Progress pose={progressPose}>
        <div />
      </Progress>
    </GuideWindow>
  );
};

export default Guide;
