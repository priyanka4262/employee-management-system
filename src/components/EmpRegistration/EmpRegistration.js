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
        presence: {
          message: "First Name cannot be blank",
        },
        length: {
          maximum: 20,
          message: "must be maximum of 20 characters",
        },
      },
      lname: {
        presence: {
          message: "Last Name cannot be blank",
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
          message: "Primary Mobile number cannot be blank",
        },
        length: {
          minimum: 10,
          maximum: 10,
          message: "should be 10 numbers",
        },
      },
      mobile2: {
        presence: {
          message: "Secondary Mobile number cannot be blank",
        },
        length: {
          minimum: 10,
          maximum: 10,
          message: "mobile number should be 10 numbers",
        },
      },
      address: {
        presence: {
          message: "Address cannot be blank",
        },
        length: {
          maximum: 100,
          message: " Address should be max of 100 characters",
        },
      },
      dob: {
        presence: {
          message: "DateOfBirth cannot be blank",
        },
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
    let history = this.props.history;
    if (!this.state.errorMsg) {
      console.log("user creation successfull");
      this.props.create_employee(emp_reg_data, history);
    } else {
      console.log("employee creation unsuccessfull");
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
    console.log(this.props.user_reg_info);
    return (
      <div>
        <h2 className="text-center heading">Employee Registration</h2>
        <section className="vh-100">
          <div className="mask d-flex align-items-center h-100 gradient-custom-3 mt-3">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                  <div className="card" style={{ borderRadius: 15 + "px" }}>
                    <div className="card-body p-3">
                      <h3 className=" text-center mb-5 sub-heading">
                        Create an Account
                      </h3>
                      <form onSubmit={this.onRegFormSubmitHandler}>
                        <div className="form-outline mb-4">
                          <label
                            className="form-label fw-bold"
                            htmlFor="form3Example1cg"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            name="fname"
                            value={fname}
                            id="form3Example1cg"
                            className="form-control form-control-lg"
                            onChange={this.onChangeFieldHandler}
                          />

                          {errorMsgs.fname && (
                            <small className="form-text text-muted ">
                              {errorMsgs.fname}
                            </small>
                          )}
                        </div>
                        <div className="form-outline mb-4">
                          <label
                            className="form-label fw-bold"
                            htmlFor="form3Example1cg"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={lname}
                            name="lname"
                            id="form3Example1cg"
                            className="form-control form-control-lg"
                            onChange={this.onChangeFieldHandler}
                          />

                          {errorMsgs.lname && (
                            <small className="form-text text-muted ">
                              {errorMsgs.lname}
                            </small>
                          )}
                        </div>

                        <div className="form-outline mb-4">
                          <label
                            className="form-label fw-bold"
                            htmlFor="form3Example3cg"
                          >
                            Personal Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={email}
                            id="form3Example3cg"
                            className="form-control form-control-lg"
                            onChange={this.onChangeFieldHandler}
                          />

                          {errorMsgs.email && (
                            <small className="form-text text-muted ">
                              {errorMsgs.email}
                            </small>
                          )}
                        </div>
                        <div className="form-outline mb-4">
                          <label
                            className="form-label fw-bold"
                            htmlFor="form3Example3cg"
                          >
                            Primary Mobile
                          </label>
                          <input
                            type="number"
                            name="mobile1"
                            value={mobile1}
                            id="form3Example3cg"
                            className="form-control form-control-lg"
                            onChange={this.onChangeFieldHandler}
                          />

                          {errorMsgs.mobile1 && (
                            <small className="form-text text-muted ">
                              {errorMsgs.mobile1}
                            </small>
                          )}
                        </div>
                        <div className="form-outline mb-4">
                          <label
                            className="form-label fw-bold"
                            htmlFor="form3Example3cg"
                          >
                            Secondary Mobile
                          </label>
                          <input
                            type="number"
                            name="mobile2"
                            value={mobile2}
                            id="form3Example3cg"
                            className="form-control form-control-lg"
                            onChange={this.onChangeFieldHandler}
                          />

                          {errorMsgs.mobile2 && (
                            <small className="form-text text-muted ">
                              {errorMsgs.mobile2}
                            </small>
                          )}
                        </div>
                        <div className="form-outline mb-4">
                          <label
                            className="form-label fw-bold"
                            htmlFor="form3Example3cg"
                          >
                            DateOfBirth
                          </label>
                          <DatePicker
                            name="dob"
                            value={dob}
                            selected={this.state.dob}
                            onChange={this.onDateChangeHandler}
                          />

                          {errorMsgs.address && (
                            <small className="form-text text-muted ">
                              {errorMsgs.address}
                            </small>
                          )}
                        </div>
                        <div className="form-outline mb-4">
                          <label
                            className="form-label fw-bold"
                            htmlFor="form3Example3cg"
                          >
                            Address
                          </label>
                          <textarea
                            className="form-control"
                            name="address"
                            value={address}
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
                        <div className="form-outline mb-4">
                          <label
                            className="form-label fw-bold"
                            htmlFor="form3Example3cg"
                          >
                            PayRoll Type
                          </label>
                          <select
                            className="form-control"
                            name="payRollType"
                            onChange={this.onChangeFieldHandler}
                            value={payRollType}
                          >
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

                        <div className="d-flex justify-content-center">
                          <button
                            type="submit"
                            className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                            disabled={
                              !fname ||
                              !lname ||
                              !mobile1 ||
                              !mobile2 ||
                              !address ||
                              !email ||
                              !dob ||
                              !payRollType ||
                              fname.errorMsgs ||
                              lname.errorMsgs ||
                              mobile1.errorMsgs ||
                              mobile2.errorMsgs ||
                              address.errorMsgs ||
                              email.errorMsgs ||
                              dob.errorMsgs ||
                              payRollType.errorMsgs
                            }
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
