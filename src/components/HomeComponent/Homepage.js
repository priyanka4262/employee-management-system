import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router";

import { is_loading_action } from "../../Actions/LoaderAction";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import DashBoard from "../DashBoard/DashBoard";
import EmpProfile from "../EmpProfile/EmpProfile.js";
import EmpRegistration from "../EmpRegistration/EmpRegistration";
import EmpList from "../EmpList/EmpList";
import MyReportees from "../MyReportees/MyReportees";
import UserProfile from "../UserProfile/UserProfile";
import PrivateRoute from "../PrivateRoute";
import AuthenticatedComponent from "../PrivateRoute";

import "./Homepage.scss";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: "",
    };
  }
  componentDidMount() {
    this.props.is_loading_action(false);
  }
  componentWillMount() {
    if (!localStorage.getItem("token")) {
      console.log("in component will mount");
      this.props.history.push("/");
    }
  }
  onMenuClickHandler = (childData) => {
    this.setState({
      showMenu: childData,
    });
  };

  render() {
    let { match } = this.props;
    const { showMenu } = this.state;

    return (
      <div className="row">
        <Header onMenuClick={this.onMenuClickHandler}></Header>
        <div className="d-flex row">
          <div className="col-md-3">
            <Sidebar dataToSidebar={showMenu}></Sidebar>
          </div>
          <div className="col-md-9 content-div">
            <Switch>
              <Route
                path={`${match.path}/dashboard`}
                component={DashBoard}
              ></Route>
              <Route
                path={`${match.path}/myprofile/`}
                component={EmpProfile}
              ></Route>
              <Route
                path={`${match.path}/empregistration`}
                component={EmpRegistration}
              ></Route>
              <Route
                exact
                path={`${match.path}/emplist`}
                component={EmpList}
              ></Route>

              <Route
                path={`${match.path}/myreportees`}
                component={MyReportees}
              ></Route>
              <Route
                path={`${match.path}/userprofile`}
                component={UserProfile}
              ></Route>
            </Switch>
          </div>
        </div>
        <div className="row">
          <Footer></Footer>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log(state);
  return {
    isLoading: state.loader,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    is_loading_action: (isLoading) => dispatch(is_loading_action(isLoading)),
  };
};
export default connect(mapStateToProps, mapDispatchtoProps)(Homepage);
