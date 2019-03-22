import React from "react";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div className="search-area">
          <input type="text" className="search-input" />
          <button className="search-button">検索</button>
        </div>
      </div>
    );
  }
}