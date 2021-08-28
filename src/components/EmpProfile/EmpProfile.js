import react, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "./EmpProfile.scss";

class EmpProfile extends Component {
  componentDidMount() {
    axios
      .get("http://localhost:8080/users/empdetails/${emp_data._id}")
      .then((response) => {
        console.log(response);
        this.setState({
          users: response.data,
        });
      })
      .catch((error) => console.log(error));
  }
  render() {
    console.log(this.props.user_info.emp_login.data._id);
    var emp_data = this.props.user_info.emp_login.data;
    const {
      employeeName,
      designation,
      employeeType,
      personalEmail,
      role,
      status,
    } = emp_data;
    return (
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
    );
  }
}
const mapStateToProps = (state) => {
  return { user_info: state.emp_login };
};
export default connect(mapStateToProps)(EmpProfile);
