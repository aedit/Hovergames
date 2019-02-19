import React from "react";
import { List } from "../../ui-components";
const GestureItem = ({ children }) => {
  return <li>{children}</li>;
};

const GestureList = ({ gestures }) => {
  return (
    <List>
      {gestures.map(gesture => (
        <GestureItem key={gesture.id}>{gesture.name}</GestureItem>
      ))}
    </List>
  );
};

export default GestureList;
