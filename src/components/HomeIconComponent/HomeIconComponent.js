import React, { Component } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import "./HomeIconComponent.scss";

export default class HomeIconComponent extends Component {
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
  render() {
    const { anchorEl } = this.state;
    return (
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <i className="bi bi-person-circle icon"></i>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}
