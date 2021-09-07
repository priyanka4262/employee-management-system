import React, { Component } from "react";
import { connect } from "react-redux";

class UserProfile extends Component {
  render() {
    console.log(this.props.emp_profile_info);
    const {
      employeeName,
      designation,
      employeeType,
      personalEmail,
      role,
      status,
      primaryMobile,
      joinedOn,
    } = this.props.emp_profile_info.user_profile_info;
    return (
      <div>
        <div className="row justify-content-center">
          <label className="text-center mt-3 profile-label">
            Employee Details
          </label>

          <div className="col-auto">
            <table className="table table-bordered mt-3 text-center">
              <tbody>
                <tr>
                  <td>Employee Name</td>
                  <td>{employeeName}</td>
                </tr>
                <tr>
                  <td>Designation</td>
                  <td>{designation}</td>
                </tr>
                <tr>
                  <td>Employee Type</td>
                  <td>{employeeType}</td>
                </tr>
                <tr>
                  <td>Personal Email</td>
                  <td>{personalEmail}</td>
                </tr>

                <tr>
                  <td>role</td>
                  <td>{role}</td>
                </tr>
                <tr>
                  <td>status</td>
                  <td>{status}</td>
                </tr>
                <tr>
                  <td>Primary Mobile</td>
                  <td>{primaryMobile}</td>
                </tr>
                <tr>
                  <td>Joined On</td>
                  <td>{joinedOn}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    isLoading: state.loader,
    emp_profile_info: state.emp_profile,
  };
};

export default connect(mapStateToProps, null)(UserProfile);
