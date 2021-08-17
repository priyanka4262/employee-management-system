import React, { Component } from "react";
import validate from "validate.js";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { validate_credentials } from "../../Actions/EmployeeLoginAction";
import "./EmployeeLogin.scss";
//import Homepage from "../HomeComponent/Homepage";
//import { push } from "connected-react-router";
//import history from "../../store/Store";

class EmployeeLogin extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errorMsgs: {},
      emp_img: "media/employee_portal.jpg",
    };
    this.constraints = {
      username: {
        presence: {
          message: "Username cannot be blank",
        },
        length: {
          minimum: 6,
          message: "must be atleast 6 characters",
        },
      },
      password: {
        presence: {
          message: "password cannot be blank",
        },
        length: {
          minimum: 6,
          message: "must be atleast 6 characters",
        },
      },
    };
  }
  validateInput = (field, value) => {
    let object = {};
    object[field] = value;
    let constraint = this.constraints[field];
    let result = validate(object, { [field]: constraint });
    if (result) {
      return result[field][0];
    }
    return null;
  };

  onChangeHandler = (event) => {
    const { errorMsgs } = this.state;
    event.preventDefault();
    let key = event.target.name;
    let value = event.target.value;
    let errorMsg = this.validateInput(key, value);
    errorMsgs[key] = errorMsg;
    this.setState({
      [key]: value,
      errorMsgs: errorMsgs,
    });
  };
  onFormSubmitHandler = (event) => {
    event.preventDefault();
    const emp_credentials = {
      username: this.state.username,
      password: this.state.password,
    };
    let history = this.props.history;
    this.props.validate_credentials(emp_credentials, history);
  };
  render() {
    const { username, password, errorMsgs, emp_img } = this.state;
    console.log(
      this.props.user_info,
      "user info coming from store using mapstatetoprops"
    );

    return (
      <div className="d-flex">
        <div className="col-md-7 flex-row mt-5">
          <img src={emp_img} alt="image" className="emp_img"></img>
        </div>

        <div className="col-md-5 flex-row-reverse login-container">
          <label className="emp-label">Employee Login</label>
          <div className="col-7 container">
            <form onSubmit={this.onFormSubmitHandler}>
              <div className="form-group row px-2">
                <label className="label mt-3">User Name</label>
                <input
                  type="username"
                  name="username"
                  value={username}
                  className="form-control col-xs-2 mt-1"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter User Name"
                  onChange={this.onChangeHandler}
                ></input>
                {errorMsgs.username && (
                  <small className="form-text text-muted">
                    {errorMsgs.username}
                  </small>
                )}
              </div>
              <div className="form-group row px-2">
                <label
                  className="label mt-3 font-weight-bold"
                  htmlFor="exampleInputPassword1"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  className="form-control col-xs-2 mt-1 "
                  placeholder="Password"
                  onChange={this.onChangeHandler}
                ></input>
                {errorMsgs.password && (
                  <small className="form-text text-muted">
                    {errorMsgs.password}
                  </small>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary col-xs-2 form-control btn-submit mt-4 mb-3"
                disabled={!username || !password}
              >
                Login
              </button>
            </form>
          </div>
        </div>
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
const mapDispatchtoProps = (dispatch) => {
  return {
    validate_credentials: (emp_credentials, history) =>
      dispatch(validate_credentials(emp_credentials, history)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchtoProps)(EmployeeLogin)
);
