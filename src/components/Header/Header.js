import React, { Component } from "react";

import HomeIconComponent from "../HomeIconComponent/HomeIconComponent";
import "./Header.scss";

class Header extends Component {
  onIconClickHandler() {
    console.log("clicked");
  }
  render() {
    return (
      <div className="header d-flex justify-content-between">
        <div className="more-icon-div">
          <i
            className="bi bi-list more-icon"
            onClick={this.onIconClickHandler}
          ></i>
        </div>
        <label className="header-text">Employee Portal</label>
        <div className="icon-button">
          <HomeIconComponent></HomeIconComponent>
        </div>
      </div>
    );
  }
}
export default Header;
