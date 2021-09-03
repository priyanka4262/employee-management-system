import React, { Component } from "react";
import { Switch, Route } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import DashBoard from "../DashBoard/DashBoard";
import EmpProfile from "../EmpProfile/EmpProfile.js";
import EmpRegistration from "../EmpRegistration/EmpRegistration";
import RegSuccess from "../EmpRegistration/RegSuccess";
import EmpList from "../EmpList/EmpList";
import "./Homepage.scss";
class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: "",
    };
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
                path={`${match.path}/myprofile`}
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
                path={`${match.path}/regsuccess`}
                component={RegSuccess}
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
export default Homepage;
