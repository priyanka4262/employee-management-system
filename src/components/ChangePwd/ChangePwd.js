import React, { Component } from "react";
import axios from "axios";
import { validate } from "validate.js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { is_loading_action } from "../../Actions/LoaderAction";
import { alert_var_action } from "../../Actions/AlertVarAction";

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
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("./");
    }
    this.props.is_loading_action(false);
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
    this.props.is_loading_action(true);
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
        this.props.alert_var_action("change_password");
        this.props.is_loading_action(false);
        this.props.history.push("./");
      })
      .catch((err) => {
        this.setState({
          errorMsg: "please try again!!",
          pwdChange: false,
        });
        console.log(err);
      });
  };

  render() {
    const {
      pwdChange,
      successMsg,
      errorMsg,
      errorMsgs,
      password,
      newpassword,
    } = this.state;

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
                  value={this.props.user_info.emp_login?.data?.personalEmail}
                  disabled
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
                disabled={!password || !newpassword}
              >
                Change Password
              </button>

              <div>
                {pwdChange ? (
                  <div className="d-flex mt-3 justify-content-center success-msg">
                    <div className="text-success">{successMsg}</div>
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
    isLoading: state.loader,
    redirectFrom: state.alert_var,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    is_loading_action: (isLoading) => dispatch(is_loading_action(isLoading)),
    alert_var_action: (redirectFrom) =>
      dispatch(alert_var_action(redirectFrom)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchtoProps)(ChangePwd)
);
