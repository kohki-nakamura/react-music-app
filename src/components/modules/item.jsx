import React from "react";

export default class Item extends React.Component {
  componentDidMount() {
    console.log(this.props.item);
  }
  render() {
    return (
      <li>
        <a href={this.props.item.trackViewUrl}>
          <div className="img">
            <img src={this.props.item.artworkUrl100} alt="artwork" />
          </div>
          <p>{this.props.item.trackCensoredName}</p>
        </a>
      </li>
    );
  }
}