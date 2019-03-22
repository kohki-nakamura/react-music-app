import React from "react";

export default class Item extends React.Component {
  render() {
    return (
      <li>
        <a href="">
          <div className="img">
            <img src="" alt="artwork" />
          </div>
          <p>曲名</p>
        </a>
      </li>
    );
  }
}