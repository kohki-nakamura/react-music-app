import React from "react";
import Item from "./item";

export default class Result extends React.Component {
  render() {
    return (
      <ul>
        {[].map((item, index) => (
          <Item key={index} />
        ))}
      </ul>
    );
  }
}