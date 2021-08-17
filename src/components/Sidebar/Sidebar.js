import { Component } from "react";
import {
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaGem, FaHeart } from "react-icons/fa";
import { withRouter, Link } from "react-router-dom";
import "./Sidebar.scss";

class Sidebar extends Component {
  render() {
    let { path } = this.props.match;
    return (
      <ProSidebar className="pro-sidebar" collapsed={false}>
        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem icon={<FaGem />}>
              Dashboard
              <Link to={`${path}/Dashboard`} />
            </MenuItem>
            <SubMenu icon={<FaHeart />} title="My Collection ">
              <MenuItem>
                My Profile
                <Link to={`${path}/MyProfile`} />
              </MenuItem>
              <MenuItem>My Colleagues</MenuItem>
              <MenuItem>My Timesheets</MenuItem>
            </SubMenu>
            <SubMenu icon={<FaHeart />} title="Employee">
              <MenuItem>
                Create Employee
                <Link to={`${path}/EmpRegistration`} />
              </MenuItem>
              <MenuItem>My Colleagues</MenuItem>
              <MenuItem>My Timesheets</MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    );
  }
}
export default withRouter(Sidebar);
