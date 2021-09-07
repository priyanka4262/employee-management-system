import React, { Component } from "react";
import { connect } from "react-redux";
import { is_loading_action } from "../../Actions/LoaderAction";

class DashBoard extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("in componentDidMount of dashboard");
  }
  onDashBoardHandler = (event) => {
    event.preventDefault();
    this.props.is_loading_action();
  };
  render() {
    console.log("console from dashboard");
    console.log(this.props.isLoading);
    return (
      <div>
        <button onClick={this.onDashBoardHandler}>click here</button>
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
export default connect(mapStateToProps, { is_loading_action })(DashBoard);
