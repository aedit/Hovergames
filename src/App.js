import React from "react";
import GestureList from "./components/GestureList";
import "./App.css";
import { useFromToPose, Window } from "./ui-components";

const App = () => {
  const windowPose = useFromToPose(1.5, { from: "hidden", to: "visible" });
  return (
    <Window pose={windowPose}>
      <h1>
        Games On Finger || Finger on games || GamESTURE{" "}
        <span>something about "NAME"...</span>
      </h1>
      <h2>Instructions</h2>
      <GestureList
        gestures={[{ id: 1, name: "OPEN" }, { id: 2, name: "CLOSE" }]}
      />
    </Window>
  );
};

export default App;
