import React, { Component } from "react";
import { validate } from "validate.js";
import axios from "axios";
import "./ResetPwd.scss";
import { connect } from "react-redux";

class ResetPwd extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      newpassword: "",
      errorMsgs: {},
      pwdReset: false,
      successMsg: "",
      errorMsg: "",
      pwdReset: false,
      email: this.props?.get_email,
    };
    this.constraints = {
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
    if (key === "password") {
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
      errorMsgs: errorMsgs,
    });
  };
  onSubmitFormHandler = (event) => {
    console.log(this.state.email);
    event.preventDefault();
    const url = "http://localhost:8080/users/resetPassword";
    const payload = {
      email: this.props?.get_email.email,
      newpassword: this.state.newpassword,
    };
    console.log(payload, "payload");

    axios
      .post(url, payload)
      .then((response) => {
        console.log(response);
        this.setState({
          successMsg: "Password changed succesfully!",
          pwdReset: true,
        });
      })
      .catch((err) => {
        this.setState({
          errorMsg: "please try again!!",
          pwdReset: false,
        });
        console.log(err);
      });
  };
  render() {
    const { pwdReset, successMsg, errorMsg, errorMsgs, password, newpassword } =
      this.state;
    // console.log(this.props.match.params.email);
    // console.log(this.props.user_info);
    console.log(this.props?.get_email.email);
    return (
      <div>
        <form onSubmit={this.onSubmitFormHandler}>
          <div className="card card-div-reset">
            <div className="card-body">
              <h5 className="card-title text-center font-weight-bold text-md">
                Reset Password
              </h5>
              <div>
                <input
                  name="password"
                  type="password"
                  className="form-control "
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
                disabled={!password || !newpassword}
              >
                Change Password
              </button>

              <div>
                {pwdReset ? (
                  <div className="text-center text-success mt-3">
                    {successMsg}
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
    // get_otp: state.forgot_pwd.get_otp,
    get_email: state.forgot_pwd.get_email,
  };
};
export default connect(mapStateToProps, null)(ResetPwd);
