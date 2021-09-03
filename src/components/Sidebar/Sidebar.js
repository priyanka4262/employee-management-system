import { Component } from "react";
import { ProSidebar, SidebarContent } from "react-pro-sidebar";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaGem, FaHeart, FaUser } from "react-icons/fa";
import { withRouter, Link } from "react-router-dom";
import "react-pro-sidebar/dist/scss/styles.scss";
import "./Sidebar.scss";

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { path } = this.props.match;
    let isSidebar = this.props.dataToSidebar;

    return (
      <div className="pro-sidebar">
        <ProSidebar collapsed={isSidebar}>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem icon={<FaGem />}>
                Dashboard
                <Link to={`${path}/dashboard`} />
              </MenuItem>
              <SubMenu icon={<FaHeart />} title="My Collection ">
                <MenuItem>
                  My Profile
                  <Link to={`${path}/myprofile`} />
                </MenuItem>
                <MenuItem>My Colleagues</MenuItem>
                <MenuItem>My Timesheets</MenuItem>
              </SubMenu>
              <SubMenu icon={<FaUser />} title="Employee">
                <MenuItem>
                  Create Employee
                  <Link to={`${path}/empregistration`} />
                </MenuItem>
                <MenuItem>
                  Employee List
                  <Link to={`${path}/emplist`} />
                </MenuItem>
              </SubMenu>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
    );
  }
}
export default withRouter(Sidebar);
