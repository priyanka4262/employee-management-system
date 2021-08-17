import React, { Component } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import DashBoard from "../DashBoard/DashBoard";
import { Switch, Route } from "react-router";
import EmpProfile from "../EmpProfile/EmpProfile.js";
//import SidebarNew from "../SidebarNew/SidebarNew";

class Homepage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { match } = this.props;
    return (
      <div>
        <Header></Header>
        <div className="d-flex">
          <div className="col-md-3">
            <Sidebar></Sidebar>
          </div>
          <div className="col-md-9">
            <Switch>
              <Route
                path={`${match.path}/Dashboard`}
                component={DashBoard}
              ></Route>
              <Route
                path={`${match.path}/MyProfile`}
                component={EmpProfile}
              ></Route>
            </Switch>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
export default Homepage;
