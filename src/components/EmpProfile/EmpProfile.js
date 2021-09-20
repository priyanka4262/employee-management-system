import react, { Component } from "react";
import { connect } from "react-redux";
import { is_loading_action } from "../../Actions/LoaderAction";
import { emp_profile } from "../../Actions/EmpProfileAction";
import "./EmpProfile.scss";

class EmpProfile extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    let id = this.props.user_info.emp_login.data._id;
    this.props.emp_profile(id);
  }
  render() {
    var emp_data = this.props.user_info?.emp_login?.data;
    console.log(emp_data);
    const {
      employeeName,
      designation,
      employeeType,
      personalEmail,
      role,
      status,
    } = emp_data;
    return (
      <div>
        <div className="row justify-content-center">
          <label className="text-center mt-3 profile-label">My Profile</label>

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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user_info: state.emp_login,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    is_loading_action: (isLoading) => dispatch(is_loading_action(isLoading)),
    emp_profile: (id) => dispatch(emp_profile(id)),
  };
};
export default connect(mapStateToProps, mapDispatchtoProps)(EmpProfile);
