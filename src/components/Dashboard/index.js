import React from "react";
import { Redirect } from "react-router-dom";
import { Window, useFromToPose, Heading, Subtitle } from "../../ui-components";
import Game from "../Game";
import { connect } from "react-redux";
import Dodge from "../../designs/Dodge.png";
import Breakout from "../../designs/Breakout.png";
import { startVideo, stop } from "../../tracker";

const Dashboard = ({ ready, gesture }) => {
  const windowPose = useFromToPose(0.3, { from: "hidden", to: "visible" });
  const [selectedGame, setSelectedGame] = React.useState(0);
  React.useEffect(() => {
    switch (gesture) {
      case "left":
        setSelectedGame(prev => (prev + 1) % 3);
        break;
      case "right":
        setSelectedGame(prev => (prev - 1 > -1 ? prev - 1 : 3) % 3);
        break;
      default:
        break;
    }
  }, [gesture]);
  React.useEffect(() => {
    if (ready) startVideo();
  }, [ready]);
  React.useEffect(() => () => void stop(), []);
  const isLoggedin =
    sessionStorage.hasOwnProperty("token") ||
    sessionStorage.hasOwnProperty("guestid");
  return !isLoggedin ? (
    <Redirect to="/" />
  ) : (
    <Window pose={windowPose}>
      <Heading>
        Dashboard
        <Subtitle>Select a Game</Subtitle>
      </Heading>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          gridArea: "list"
        }}
      >
        <Game
          key={1}
          name="Snake"
          selected={selectedGame === 0}
          changeSelect={() => setSelectedGame(0)}
          desc="Eat the Blocks!"
        />
        <Game
          key={2}
          name="Dodge"
          selected={selectedGame === 1}
          changeSelect={() => setSelectedGame(1)}
          background={Dodge}
          desc="Ditch the blocks!"
        />
        <Game
          key={3}
          name="Breakout"
          selected={selectedGame === 2}
          changeSelect={() => setSelectedGame(2)}
          background={Breakout}
          desc="Break the blocks!"
        />
      </div>
    </Window>
  );
};

const mapStateToProps = state => ({
  ...state
});

export default connect(
  mapStateToProps,
  () => {}
)(Dashboard);
