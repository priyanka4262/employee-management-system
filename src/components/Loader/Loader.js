import React, { Component } from "react";

export default class Loader extends Component {
  render() {
    return (
      <div>
        <div className="progress progress-div">
          <div
            className="progress-bar w-75 progress-bar-div progress-bar-striped"
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    );
  }
}
