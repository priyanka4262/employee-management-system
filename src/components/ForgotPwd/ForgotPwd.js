import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { forgot_pwd_action } from "../../Actions/ForgotPwdAction";
import { get_email_action } from "../../Actions/ForgotPwdAction";
import { is_loading_action } from "../../Actions/LoaderAction";

import "./ForgotPwd.scss";

class ForgotPwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      successMsg: "",
      errorMsg: "",
      otpReceived: false,
      otpValue: "",
      otpResponse: "",
      email_store: "",
    };
  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("./");
    }
  }

  onEmailChangeHandler = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  OtpGenerationHandler = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const url = "http://localhost:8080/users/otpgeneration";
    this.props.forgot_pwd_action({ email: email });
    this.props.get_email_action({ email: email });
    this.props.is_loading_action(true);

    if (this.props.get_otp?.status === 200) {
      this.props.is_loading_action(false);
      this.setState({
        successMsg: "OTP Sent to Email!",
        otpReceived: true,
        email: "",
      });
    } else if (this.props.get_otp) {
      this.setState({
        errorMsg: "Unable to generate OTP",
        otpReceived: false,
      });
    }
  };

  otpFieldHandler = (event) => {
    this.setState({
      otpValue: event.target.value,
    });
  };
  onOtpSubmitHandler = (event) => {
    event.preventDefault();

    const url = "http://localhost:8080/users/checkOtp";
    const payload = {
      email: this.props.get_email.email,
      otp: parseInt(this.state.otpValue),
    };

    axios
      .post(url, payload)
      .then((response) => {
        if (response.data?.status === 200) {
          this.props.history.push("/resetpwd");
          this.props.is_loading_action(false);
        } else {
          this.setState({
            errorMsg: "Invalid OTP, please try again!",
          });
          this.props.is_loading_action(true);
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { successMsg, errorMsg, otpReceived, email, isLoading } = this.state;

    return (
      <div>
        <div className="container container-div">
          <div className="row">
            <div className="col-md-6 col-md-offset-4">
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="text-center">
                    <h5>
                      <i className="fa fa-lock fa-4x"></i>
                    </h5>
                    <h4 className="text-center">Forgot Password?</h4>
                    <p>You can reset your password here.</p>
                    <div className="panel-body">
                      <form
                        id="register-form"
                        role="form"
                        autoComplete="off"
                        className="form"
                        onSubmit={this.OtpGenerationHandler}
                      >
                        <div className="form-group">
                          <div className="email-label">
                            <input
                              id="email"
                              name="email"
                              placeholder="Email Address"
                              className="form-control"
                              type="email"
                              onChange={this.onEmailChangeHandler}
                            ></input>
                          </div>
                        </div>
                        <div className="form-group">
                          <button
                            className="btn btn-sm btn-primary btn-block mt-3"
                            type="submit"
                            disabled={!email}
                          >
                            Reset Password
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {otpReceived ? (
          <div className="card card-div d-flex">
            <div className="text-center">
              <label className="success-msg d-flex flex-column mt-2">
                {successMsg}
              </label>
              <input
                type="text"
                className="d-flex flex-column form-control otp-label"
                placeholder="Enter OTP"
                onChange={this.otpFieldHandler}
              ></input>
              <button
                className="btn btn-sm btn-primary btn-block mt-3 mb-3"
                onClick={this.onOtpSubmitHandler}
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        ) : (
          <div>
            <label className="text-danger d-flex flex-column mt-2">
              {errorMsg}
            </label>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    get_otp: state.forgot_pwd.get_otp,
    get_email: state.forgot_pwd.get_email,
    isLoading: state.loader,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    forgot_pwd_action: (email) => dispatch(forgot_pwd_action(email)),
    get_email_action: (email) => dispatch(get_email_action(email)),
    is_loading_action: (isLoading) => dispatch(is_loading_action(isLoading)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchtoProps)(ForgotPwd)
);
