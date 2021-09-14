import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import { clear_store } from "../../Actions/ClearStoreAction";

class Signout extends Component {
  componentDidMount() {
    localStorage.clear();
    this.props.clear_store();
  }
  render() {
    return (
      <div>
        <Redirect to="/" />
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
  };
};
export default connect(mapStateToProps, mapDispatchtoProps)(Signout);
