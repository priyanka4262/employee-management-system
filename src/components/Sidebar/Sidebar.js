import { Component } from "react";
import { ProSidebar, SidebarContent } from "react-pro-sidebar";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaGem, FaHeart, FaUser } from "react-icons/fa";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import "react-pro-sidebar/dist/scss/styles.scss";
import "./Sidebar.scss";

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { path } = this.props.match;
    let isSidebar = this.props.dataToSidebar;
    const id = this.props.user_info?.emp_login?.data?._id;

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
                  <Link to={`${path}/myprofile/`} />
                </MenuItem>
                <MenuItem>
                  My Reportees
                  <Link to={`${path}/myreportees/${id}`} />
                </MenuItem>
                <MenuItem>
                  My Timesheets
                  <Link to={`${path}/mytimesheets`} />
                </MenuItem>
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
const mapStateToProps = (state) => {
  return {
    user_info: state.emp_login,
  };
};
export default withRouter(connect(mapStateToProps, null)(Sidebar));
