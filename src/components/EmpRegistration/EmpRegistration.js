import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { create_employee } from "../../Actions/CreateEmpAction";
import DatePicker from "react-datepicker";
import validate from "validate.js";
import "./EmpRegistration.scss";

class EmpRegistration extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      email: "",
      mobile1: "",
      mobile2: "",
      address: "",
      dob: "",
      payRollType: "",
      errorMsgs: {},
    };
    this.constraints = {
      fname: {
        presence: true,
        length: {
          maximum: 20,
          message: "must be maximum of 20 characters",
        },
      },

      lname: {
        presence: {
          message: "last name is required",
        },
        length: {
          maximum: 20,
          message: "must be maximum of 20 characters",
        },
      },
      email: {
        presence: {
          message: "Email cannot be blank",
        },
        email: true,
      },
      mobile1: {
        presence: {
          message: "Mobile number cannot be blank",
        },
        length: {
          maximum: 10,
          message: "mobile number should be 10 numbers",
        },
      },
      mobile2: {
        presence: {
          message: "Mobile number cannot be blank",
        },
        length: {
          maximum: 10,
          message: "mobile number should be 10 numbers",
        },
      },
      address: {
        presence: true,
        length: {
          maximum: 100,
          message: " Address should be max of 100 characters",
        },
      },
      dob: {
        presence: true,
      },
      payRollType: {
        presence: true,
        length: {
          minimum: 1,
          message: "payRollType is a required field",
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

  onChangeFieldHandler = (event) => {
    const { errorMsgs } = this.state;
    event.preventDefault();
    let key = event.target.name;
    let value =
      event.target.value === "Select" ? undefined : event.target.value;
    let errorMsg = this.validateInput(key, value);
    errorMsgs[key] = errorMsg;
    this.setState({
      [key]: value,
      errorMsgs: errorMsgs,
    });
  };

  onRegFormSubmitHandler = (event) => {
    // console.log(event.target.value);
    const {
      fname,
      lname,
      email,
      address,
      errorMsgs,
      mobile1,
      mobile2,
      dob,
      payRollType,
    } = this.state;
    event.preventDefault();
    const emp_reg_data = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      mobile1: this.state.mobile1,
      mobile2: this.state.mobile2,
      address: this.state.address,
      dob: this.state.dob,
      payRollType: this.state.payRollType,
    };
    if (!this.state.errorMsgs) {
      console.log("Login Successful", this.state);
      let history = this.props.history;
      this.props.create_employee(emp_reg_data, history);
    } else {
      console.log("Login unSuccessful", this.state.errorMsg);
    }
  };
  onDateChangeHandler = (date) => {
    console.log(date);
    this.setState({
      dob: date,
    });
  };

  render() {
    const {
      fname,
      lname,
      email,
      mobile1,
      mobile2,
      address,
      dob,
      payRollType,
      errorMsgs,
    } = this.state;
    //console.log(this.props.user_reg_info);
    return (
      <div>
        <h2 className="text-center heading mt-3">Employee Registration</h2>
        <section className="vh-100">
          <div className="mask d-flex align-items-center h-100 gradient-custom-3 ">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-10">
                  <div className="card">
                    <div className="card-body p-3">
                      <h3 className=" text-center mb-5 sub-heading">
                        Create an Account
                      </h3>
                      <form onSubmit={this.onRegFormSubmitHandler}>
                        <div className="row">
                          <div className="form-outline mb-4 col-md-6 ">
                            <input
                              type="text"
                              name="fname"
                              value={fname}
                              placeholder="First Name"
                              id="form3Example1cg"
                              className="form-control form-control-md"
                              onChange={this.onChangeFieldHandler}
                            />

                            {errorMsgs.fname && (
                              <small className="form-text text-muted ">
                                {errorMsgs.fname}
                              </small>
                            )}
                          </div>
                          <div className="form-outline mb-4 col-md-6">
                            <input
                              type="text"
                              value={lname}
                              name="lname"
                              placeholder="Last Name"
                              id="form3Example1cg"
                              className="form-control form-control-md"
                              onChange={this.onChangeFieldHandler}
                            />

                            {errorMsgs.lname && (
                              <small className="form-text text-muted ">
                                {errorMsgs.lname}
                              </small>
                            )}
                          </div>
                        </div>

                        <div className="row">
                          <div className="form-outline mb-4 col-md-6">
                            <input
                              type="tel"
                              name="mobile1"
                              value={mobile1}
                              placeholder="Primary Mobile"
                              id="form3Example3cg"
                              className="form-control form-control-md"
                              onChange={this.onChangeFieldHandler}
                            />

                            {errorMsgs.mobile1 && (
                              <small className="form-text text-muted ">
                                {errorMsgs.mobile1}
                              </small>
                            )}
                          </div>
                          <div className="form-outline mb-4 col-md-6">
                            <input
                              type="tel"
                              name="mobile2"
                              value={mobile2}
                              placeholder="Secondary Mobile"
                              id="form3Example3cg"
                              className="form-control form-control-md"
                              onChange={this.onChangeFieldHandler}
                            />

                            {errorMsgs.mobile2 && (
                              <small className="form-text text-muted ">
                                {errorMsgs.mobile2}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email ID"
                            id="form3Example3cg"
                            className="form-control form-control-md"
                            onChange={this.onChangeFieldHandler}
                          />

                          {errorMsgs.email && (
                            <small className="form-text text-muted ">
                              {errorMsgs.email}
                            </small>
                          )}
                        </div>
                        <div className="row">
                          <div className="form-outline mb-4 col-md-6">
                            <div className="customDatePickerWidth">
                              <DatePicker
                                name="dob"
                                value={dob}
                                placeholder="Date of Birth"
                                selected={this.state.dob}
                                className="form-control form-control-md"
                                onChange={this.onDateChangeHandler}
                              />
                            </div>

                            {errorMsgs.dob && (
                              <small className="form-text text-muted ">
                                {errorMsgs.dob}
                              </small>
                            )}
                          </div>

                          <div className="form-outline mb-4 col-md-6">
                            <select
                              className="form-control"
                              name="payRollType"
                              onChange={this.onChangeFieldHandler}
                              value={payRollType}
                            >
                              <option value="" disabled selected hidden>
                                PayRoll Type
                              </option>
                              <option value="permanent">Permanent</option>
                              <option value="contractor">Contractor</option>
                            </select>
                            {errorMsgs.payRollType && (
                              <small
                                id="emailHelp"
                                className="form-text text-muted"
                              >
                                {errorMsgs.payRollType}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="form-outline mb-2">
                          <textarea
                            className="form-control"
                            name="address"
                            value={address}
                            placeholder="Address"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            onChange={this.onChangeFieldHandler}
                          ></textarea>

                          {errorMsgs.address && (
                            <small className="form-text text-muted ">
                              {errorMsgs.address}
                            </small>
                          )}
                        </div>

                        <div className="d-flex justify-content-center">
                          <button
                            type="submit"
                            className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                          >
                            Create
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    user_reg_info: state.emp_reg,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    create_employee: (emp_reg_data, history) =>
      dispatch(create_employee(emp_reg_data, history)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchtoProps)(EmpRegistration)
);
