import React from "react";
import { Redirect } from "react-router-dom";
import { Window, useFromToPose, Heading, Subtitle } from "../../ui-components";
import Game from "../Game";

import Dodge from "../../designs/Dodge.png";
import Breakout from "../../designs/Breakout.png";

const Dashboard = () => {
  const windowPose = useFromToPose(0.3, { from: "hidden", to: "visible" });
  const [selectedGame, setSelectedGame] = React.useState(0);
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
          name="Pong"
          selected={selectedGame === 0}
          changeSelect={() => setSelectedGame(0)}
          color="tomato"
          desc="Game is awesome! :P"
        />
        <Game
          key={2}
          name="Dodge"
          selected={selectedGame === 1}
          changeSelect={() => setSelectedGame(1)}
          background={Dodge}
          desc="Game is awesome! :P"
        />
        <Game
          key={3}
          name="Breakout"
          selected={selectedGame === 2}
          changeSelect={() => setSelectedGame(2)}
          background={Breakout}
          desc="Game is awesome! :P"
        />
      </div>
    </Window>
  );
};

export default Dashboard;
