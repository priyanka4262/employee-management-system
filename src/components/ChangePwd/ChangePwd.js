import React, { Component } from "react";
import { validate } from "validate.js";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EmployeeLogin from "../LoginComponent/EmployeeLogin";

class ChangePwd extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      newpassword: "",
      errorMsgs: {},
      pwdChange: false,
      successMsg: "",
      errorMsg: "",
    };
    this.constraints = {
      email: {
        presence: true,
      },
      password: {
        presence: true,
        length: {
          minimum: 6,
        },
      },
      newpassword: {
        equality: "password",
      },
    };
  }

  validateInput = (key, value) => {
    const { password } = this.state;
    let object = {};
    object[key] = value;
    if (key === "newpassword") {
      object["password"] = password;
    }
    let constraint = this.constraints[key];
    let result = validate(object, { [key]: constraint });
    if (result) {
      return result[key][0];
    }
    return null;
  };
  onPasswordChangeHandler = (event) => {
    event.preventDefault();
    const { errorMsgs } = this.state;
    let key = event.target.name;
    let value = event.target.value;
    if (key === "email") {
      this.setState({
        email: value,
      });
    } else if (key === "password") {
      this.setState({
        password: value,
      });
    } else if (key === "newpassword") {
      this.setState({
        newpassword: value,
      });
    }
    let errMsg = this.validateInput(key, value);
    errorMsgs[key] = errMsg;
    this.setState({
      //[key]: value,
      errorMsgs: errorMsgs,
    });
  };
  onSubmitFormHandler = (event) => {
    event.preventDefault();
    const url = "http://localhost:8080/users/changePassword";
    const payload = {
      currentpassword: this.props.user_info.emp_login?.data.password,
      confirmpassword: this.state.newpassword,
      newpassword: this.state.password,
      employeeId: this.props.user_info.emp_login?.data.employeeId,
    };

    axios
      .post(url, payload)
      .then((response) => {
        console.log(response);
        this.setState({
          successMsg: "Password changed succesfully!",
          pwdChange: true,
        });
      })
      .catch((err) => {
        this.setState({
          errorMsg: "please try again!!",
          pwdChange: false,
        });
        console.log(err);
      });
  };
  backToLoginHandler = () => {
    this.props.history.push("./");
  };
  render() {
    const {
      pwdChange,
      successMsg,
      errorMsg,
      errorMsgs,
      password,
      newpassword,
      email,
    } = this.state;
    console.log(this.props.user_info.emp_login?.data.employeeId);
    return (
      <div>
        <form onSubmit={this.onSubmitFormHandler}>
          <div className="card card-div-reset">
            <div className="card-body">
              <h5 className="card-title text-center font-weight-bold text-md">
                Change Password
              </h5>
              <div>
                <input
                  name="email"
                  type="email"
                  className="form-control "
                  placeholder="Email ID"
                  onChange={this.onPasswordChangeHandler}
                />
                {errorMsgs.email && (
                  <small className="form-text text-danger">
                    {errorMsgs.email}
                  </small>
                )}
              </div>
              <div>
                <input
                  name="password"
                  type="password"
                  className="form-control mt-3"
                  placeholder="New Password"
                  onChange={this.onPasswordChangeHandler}
                />
                {errorMsgs.password && (
                  <small className="form-text text-danger">
                    {errorMsgs.password}
                  </small>
                )}
              </div>
              <div>
                <input
                  name="newpassword"
                  type="password"
                  className="form-control mt-3"
                  placeholder="Confirm Password"
                  onChange={this.onPasswordChangeHandler}
                />
                {errorMsgs.newpassword && (
                  <small className="form-text text-danger">
                    {errorMsgs.newpassword}
                  </small>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-3 changepwd-btn"
                disabled={!password || !newpassword || !email}
              >
                Change Password
              </button>

              <div>
                {pwdChange ? (
                  <div className="d-flex mt-3 justify-content-center success-msg">
                    <div className="text-success">{successMsg}</div>
                    <div>
                      <button
                        className="btn btn-primary"
                        onClick={this.backToLoginHandler}
                      >
                        Back To Login
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className=" text-center mt-3 text-danger">
                    {errorMsg}
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    user_info: state.emp_login,
  };
};
export default withRouter(connect(mapStateToProps, null)(ChangePwd));
