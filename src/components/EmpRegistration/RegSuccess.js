import React, { Component } from "react";
import "./RegSuccess.scss";
class RegSuccess extends Component {
  render() {
    return (
      <div className="alert alert-success col-md-6 success-alert" role="alert">
        User registered successfully
      </div>
    );
  }
}
export default RegSuccess;
