import React, { Component } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";
import { clear_store } from "../../Actions/ClearStoreAction";
import "./HomeIconComponent.scss";
import { connect } from "react-redux";

class HomeIconComponent extends Component {
  //const [anchorEl, setAnchorEl] = React.useState(null);
  constructor() {
    super();
    this.state = {
      anchorEl: null,
    };
  }

  handleClick = (event) => {
    console.log("onclick");
    console.log(event.currentTarget);
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };
  onClickLogoutHandler = () => {
    this.props.clear_store();
    localStorage.clear();
    this.props.history.push("./");
  };
  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button aria-controls="simple-menu" aria-haspopup="true">
          <i
            className="bi bi-person-circle icon"
            onClick={this.handleClick}
          ></i>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          // getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ horizontal: "center", vertical: "bottom" }}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.onClickLogoutHandler}>Logout</MenuItem>
        </Menu>
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
export default withRouter(
  connect(mapStateToProps, mapDispatchtoProps)(HomeIconComponent)
);
