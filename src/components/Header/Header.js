import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import HomeIconComponent from "../HomeIconComponent/HomeIconComponent";
import { clear_store } from "../../Actions/ClearStoreAction";
import "./Header.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
  }
  onIconClickHandler = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    });
    this.props.onMenuClick(this.state.showMenu);
  };
  onSignoutHandler = () => {
    // localStorage.clear();
    this.props.history.push("/");
    // this.props.clear_store();
  };
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
        {/* <div className="icon-button">
          <HomeIconComponent></HomeIconComponent>
          <a>Signout</a>
        </div> */}
        <div className="icon-button">
          <a onClick={this.onSignoutHandler}>Signout</a>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    isLoading: state.loader,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    clear_store: () => dispatch(clear_store()),
    // is_loading_action: (isLoading) => dispatch(is_loading_action(isLoading)),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(Header));
