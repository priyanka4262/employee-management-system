import React, { Component } from "react";
import "./Footer.scss";

export default class Footer extends Component {
  render() {
    return (
      <>
        <div className="footer">
          <div className="footer-copyright text-center py-3">
            © 2021 copyright : Employee Portal
          </div>
        </div>
      </>
    );
  }
}
