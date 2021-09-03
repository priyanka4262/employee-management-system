import React, { Component } from "react";

export default class ErrorPage extends Component {
  render() {
    return (
      <div className="h-100 row align-items-center w-80">
        <div class=" col alert alert-danger ">
          <strong>Invalid credentials! Please try again</strong>
        </div>
      </div>
    );
  }
}
