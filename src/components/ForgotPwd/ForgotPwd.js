import axios from "axios";
import { withRouter } from "react-router";
import React, { Component } from "react";
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
    };
  }
  onEmailChangeHandler = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  OtpGenerationHandler = (event) => {
    event.preventDefault();
    const { email, successMsg, errorMsg } = this.state;
    const url = "http://localhost:8080/users/otpgeneration";
    axios
      .post(url, { email: email })
      .then((response) => {
        this.setState({
          successMsg: "OTP Sent to Email!",
          otpReceived: true,
          otpResponse: response.data,
        });
      })
      .catch((err) => {
        this.setState({
          errorMsg: "Unable to generate OTP",
          otpReceived: false,
        });
      });
  };
  otpFieldHandler = (event) => {
    this.setState({
      otpValue: event.target.value,
    });
  };
  onOtpSubmitHandler = (event) => {
    event.preventDefault();
    const path = this.props.location.pathname;
    const url = "http://localhost:8080/users/checkOtp";
    const payload = {
      email: this.state.email,
      otp: Number(this.state.otpValue),
    };

    axios
      .post(url, payload)
      .then((response) => {
        if (response.data.status === 200) {
          this.props.history.push(`/ResetPwd/${payload.email}`);
        } else {
          this.setState({
            errorMsg: "Invalid OTP, please try again!",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { successMsg, errorMsg, otpReceived, email } = this.state;
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
export default withRouter(ForgotPwd);
