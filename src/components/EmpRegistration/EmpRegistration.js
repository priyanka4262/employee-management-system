import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { create_employee } from "../../Actions/CreateEmpAction";
import { update_employee } from "../../Actions/UpdateEmpAction";
import { emp_profile } from "../../Actions/EmpProfileAction";
import validate from "validate.js";
import "./EmpRegistration.scss";
import axios from "axios";

class EmpRegistration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      fname: "",
      lname: "",
      email: "",
      mobile1: "",
      mobile2: "",
      address: "",
      dob: "",
      payRollType: "",
      employeeType: "",
      role: "",
      doj: "",
      jobstatus: "",
      rmanager: "",
      cost: "",
      designation: "",
      errorMsgs: {},
      managersList: [],
      isUpdateFlow: false,
      updatedUserData: [],
      managerId: "",
      empId: this.props.match.params.id,
      empData: this.props?.user_profile_info,
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
      doj: {
        presence: true,
      },
      jobstatus: {
        presence: true,
      },
      employeeType: {
        presence: true,
      },
      designation: {
        presence: true,
      },
      rmanager: {
        presence: true,
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
    event.preventDefault();
    const { errorMsgs } = this.state;
    let key = event.target.name;
    let value =
      event.target.value === "select" ? undefined : event.target.value;
    let errorMsg = this.validateInput(key, value);
    errorMsgs[key] = errorMsg;
    this.setState(
      {
        [key]: value,
        errorMsgs: errorMsgs,
      },
      () => console.log("manager", [this.state.rmanager])
    );
  };

  // validateForm = () => {
  //   if (!this.state.fname || !this.state.lname) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  componentDidMount() {
    const { empData, managersList, empId } = this.state;
    const token = localStorage.getItem("token");

    if (empId) {
      console.log("in edit mode");
      this.props.emp_profile(this.state.empId);
      let url = "http://localhost:8080/users/managers";
      axios
        .get(url)
        .then((response) => {
          this.setState({
            managersList: response.data,
          });
          console.log(this.state.managersList);
          this.state.managersList.map((res) => {
            if (res.employeeId === empData?.manager) {
              this.setState({
                rmanager: res.employeeId,
              });
            }
          });
          this.setState({
            ...this.state,
            id: empData?._id,
            fname: empData?.employeeName.split(" ")[0],
            lname: empData?.employeeName.split(" ")[1],
            email: empData?.personalEmail,
            mobile1: empData?.primaryMobile,
            mobile2: empData?.alternateMobile,
            address: empData?.address,
            payRollType: empData?.payRollType,
            role: empData?.role,
            employeeType: empData?.employeeType,
            cost: empData?.cost,
            jobstatus: empData?.status,
            designation: empData?.designation,
            doj: empData?.joinedOn,
            dob: empData?.dob,
            isUpdateFlow: true,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      let url = "http://localhost:8080/users/managers";
      axios
        .get(url)
        .then((response) => {
          this.setState({
            managersList: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  onRegFormSubmitHandler = (event) => {
    const { id } = this.state;
    console.log("id", id);
    event.preventDefault();
    console.log("on submit handler of emp reg");
    let history = this.props.history;

    if (this.state.isUpdateFlow) {
      console.log("update flow is true");
      const emp_update_data = {
        etype: this.state.employeeType,
        erole: this.state.role,
        designation: this.state.designation,
        email: this.state.email,
        mobile1: this.state.mobile1,
        mobile2: this.state.mobile2,
        doj: this.state.doj,
        jobstatus: this.state.jobstatus,
        dob: this.state.dob,
        address: this.state.address,
        rmanager: parseInt(this.state.rmanager),
        epayroll: this.state.payRollType,
        ctc: this.state.cost,
        _id: this.state.id,
      };
      console.log("emp_update_data", emp_update_data);
      this.props.update_employee(emp_update_data, history);
    } else {
      const emp_reg_data = {
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        mobile1: this.state.mobile1,
        mobile2: this.state.mobile2,
        address: this.state.address,
        dob: this.state.dob,
        epayroll: this.state.payRollType,
        erole: this.state.role,
        etype: this.state.employeeType,
        ctc: this.state.cost,
        doj: this.state.doj,
        jobstatus: this.state.jobstatus,
        designation: this.state.designation,
        rmanager: parseInt(this.state.rmanager),
      };

      this.props.create_employee(emp_reg_data, history);
    }
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
      employeeType,
      role,
      rmanager,
      jobstatus,
      doj,
      errorMsgs,
      designation,
      cost,
      managersList,
    } = this.state;

    return (
      <div>
        <h2 className="text-center heading mt-3"></h2>
        <section className="vh-100">
          <div className="mask d-flex align-items-center h-100 gradient-custom-3 ">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-10">
                  <div className="card ">
                    <div className="card-body p-3 card-div-emp">
                      <h3 className=" text-center mb-5 sub-heading">
                        {this.state.isUpdateFlow
                          ? "Edit Employee Details"
                          : "Register an Employee"}
                      </h3>
                      <form onSubmit={this.onRegFormSubmitHandler}>
                        <div className="row">
                          <div className="form-outline mb-4 col-md-6 form-group required">
                            <label
                              className="form-label  fw-bold control-label"
                              htmlFor="form3Example3cg"
                            >
                              First Name
                            </label>
                            <input
                              type="text"
                              name="fname"
                              value={fname}
                              placeholder="First Name"
                              id="form3Example1cg"
                              className="form-control form-control-md "
                              onChange={this.onChangeFieldHandler}
                              autoComplete="off"
                            />

                            {errorMsgs.fname && (
                              <small className="form-text text-muted ">
                                {errorMsgs.fname}
                              </small>
                            )}
                          </div>
                          <div className="form-outline mb-4 col-md-6 form-group required">
                            <label
                              className="form-label fw-bold control-label"
                              htmlFor="form3Example3cg"
                            >
                              Last Name
                            </label>
                            <input
                              type="text"
                              value={lname}
                              name="lname"
                              placeholder="Last Name"
                              id="form3Example1cg"
                              className="form-control form-control-md"
                              autoComplete="off"
                              onChange={this.onChangeFieldHandler}
                            />

                            {errorMsgs.lname && (
                              <small className="form-text text-danger">
                                {errorMsgs.lname}
                              </small>
                            )}
                          </div>
                        </div>

                        <div className="row">
                          <div className="form-outline mb-4 col-md-6 form-group required">
                            <label
                              className="form-label fw-bold control-label"
                              htmlFor="form3Example3cg"
                            >
                              Primary Mobile
                            </label>

                            <input
                              type="tel"
                              value={mobile1}
                              name="mobile1"
                              placeholder="Primary Mobile"
                              className="form-control"
                              autoComplete="off"
                              onChange={this.onChangeFieldHandler}
                            />

                            {errorMsgs.mobile1 && (
                              <small className="form-text text-danger ">
                                {errorMsgs.mobile1}
                              </small>
                            )}
                          </div>
                          <div className="form-outline mb-4 col-md-6">
                            <label
                              className="form-label fw-bold"
                              htmlFor="form3Example3cg"
                            >
                              Secondary Mobile
                            </label>
                            <input
                              type="tel"
                              value={mobile2}
                              name="mobile2"
                              placeholder="Primary Mobile"
                              className="form-control"
                              autoComplete="off"
                              onChange={this.onChangeFieldHandler}
                            />

                            {errorMsgs.mobile2 && (
                              <small className="form-text text-danger ">
                                {errorMsgs.mobile2}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-outline mb-4 col-md-6 form-group required">
                            <label
                              className="form-label fw-bold control-label"
                              htmlFor="form3Example3cg"
                            >
                              Email ID
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={email}
                              placeholder="Email ID"
                              id="form3Example3cg"
                              autoComplete="off"
                              className="form-control form-control-md"
                              onChange={this.onChangeFieldHandler}
                            />

                            {errorMsgs.email && (
                              <small className="form-text text-danger ">
                                {errorMsgs.email}
                              </small>
                            )}
                          </div>
                          <div className="form-outline mb-4 col-md-6 form-group required">
                            <label
                              className="form-label fw-bold control-label"
                              htmlFor="form3Example3cg"
                            >
                              Designation
                            </label>
                            <select
                              className="form-control"
                              name="designation"
                              onChange={this.onChangeFieldHandler}
                              value={designation}
                            >
                              <option value="" disabled>
                                Designation
                              </option>
                              <option value="Associate">Associate</option>
                              <option value="Associate Manager">
                                Associate Manager
                              </option>
                              <option value="Team Lead">Team Lead</option>
                            </select>

                            {errorMsgs.designation && (
                              <small className="form-text text-danger ">
                                {errorMsgs.designation}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-outline mb-4 col-md-6">
                            <label
                              className="form-label fw-bold"
                              htmlFor="form3Example3cg"
                            >
                              Date of Birth
                            </label>
                            <div className="customDatePickerWidth">
                              <input
                                name="dob"
                                value={dob}
                                type="date"
                                placeholder="Date of Birth"
                                autoComplete="off"
                                selected={this.state.dob}
                                className="form-control form-control-md"
                                onChange={this.onChangeFieldHandler}
                              />
                            </div>

                            {errorMsgs.dob && (
                              <small className="form-text text-danger ">
                                {errorMsgs.dob}
                              </small>
                            )}
                          </div>

                          <div className="form-outline mb-4 col-md-6 form-group required">
                            <label
                              className="form-label fw-bold control-label"
                              htmlFor="form3Example3cg"
                            >
                              Payroll Type
                            </label>
                            <select
                              className="form-control"
                              name="payRollType"
                              onChange={this.onChangeFieldHandler}
                              value={payRollType}
                            >
                              <option value="" disabled>
                                PayRoll Type
                              </option>
                              <option value="permanent">Permanent</option>
                              <option value="contractor">Contractor</option>
                            </select>
                            {errorMsgs.payRollType && (
                              <small
                                id="emailHelp"
                                className="form-text text-danger"
                              >
                                {errorMsgs.payRollType}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-outline mb-4 col-md-6 form-group required">
                            <label
                              className="form-label fw-bold control-label"
                              htmlFor="form3Example3cg"
                            >
                              Date of Joining
                            </label>
                            <div className="customDatePickerWidth">
                              <input
                                name="doj"
                                value={doj}
                                type="date"
                                autoComplete="off"
                                placeholder="Date of Joining"
                                selected={this.state.doj}
                                className="form-control form-control-md"
                                onChange={this.onChangeFieldHandler}
                              />
                            </div>

                            {errorMsgs.doj && (
                              <small className="form-text text-danger ">
                                {errorMsgs.doj}
                              </small>
                            )}
                          </div>

                          <div className="form-outline mb-4 col-md-6">
                            <label
                              className="form-label fw-bold"
                              htmlFor="form3Example3cg"
                            >
                              CTC
                            </label>
                            <input
                              type="number"
                              name="cost"
                              value={cost}
                              placeholder="CTC"
                              autoComplete="off"
                              id="form3Example3cg"
                              className="form-control form-control-md"
                              onChange={this.onChangeFieldHandler}
                            />

                            {errorMsgs.cost && (
                              <small
                                id="emailHelp"
                                className="form-text text-danger"
                              >
                                {errorMsgs.cost}
                              </small>
                            )}
                          </div>
                        </div>

                        <div className="row">
                          <div className="form-outline mb-4 col-md-6 form-group required">
                            <label
                              className="form-label fw-bold control-label"
                              htmlFor="form3Example3cg"
                            >
                              Employee Type
                            </label>
                            <select
                              className="form-control"
                              name="employeeType"
                              onChange={this.onChangeFieldHandler}
                              value={employeeType}
                            >
                              <option value="" disabled>
                                Employee Type
                              </option>
                              <option value="permanent">Permanent</option>
                              <option value="contractor">Contractor</option>
                            </select>

                            {errorMsgs.employeeType && (
                              <small className="form-text text-danger ">
                                {errorMsgs.employeeType}
                              </small>
                            )}
                          </div>

                          <div className="form-outline mb-4 col-md-6 form-group required">
                            <label
                              className="form-label fw-bold control-label"
                              htmlFor="form3Example3cg"
                            >
                              Role
                            </label>
                            <select
                              className="form-control"
                              name="role"
                              onChange={this.onChangeFieldHandler}
                              value={role}
                            >
                              <option value="" disabled>
                                Role
                              </option>
                              <option value="Super Admin">Super Admin</option>
                              <option value="Admin">Admin</option>
                              <option value="Manager">Manager</option>
                              <option value="Employee">Employee</option>
                            </select>
                            {errorMsgs.payRollType && (
                              <small
                                id="emailHelp"
                                className="form-text text-danger"
                              >
                                {errorMsgs.payRollType}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-outline mb-4 col-md-6 form-group required">
                            <label
                              className="form-label fw-bold control-label"
                              htmlFor="form3Example3cg"
                            >
                              Job status
                            </label>
                            <select
                              className="form-control"
                              name="jobstatus"
                              onChange={this.onChangeFieldHandler}
                              value={jobstatus}
                            >
                              <option value="" disabled>
                                Job Status
                              </option>
                              <option value="Active">Active</option>
                              <option value="Inactive">InActive</option>
                            </select>

                            {errorMsgs.jobstatus && (
                              <small className="form-text text-danger ">
                                {errorMsgs.jobstatus}
                              </small>
                            )}
                          </div>

                          <div className="form-outline mb-4 col-md-6 form-group required">
                            <label
                              className="form-label fw-bold control-label"
                              htmlFor="form3Example3cg"
                            >
                              Manager
                            </label>
                            <select
                              className="form-control"
                              name="rmanager"
                              onChange={this.onChangeFieldHandler}
                              value={rmanager}
                            >
                              <option value="" disabled>
                                Manager
                              </option>
                              {managersList.map((obj) => {
                                return (
                                  <option key={obj._id} value={obj.employeeId}>
                                    {obj.employeeName}
                                  </option>
                                );
                              })}
                            </select>

                            {errorMsgs.rmanager && (
                              <small className="form-text text-danger ">
                                {errorMsgs.rmanager}
                              </small>
                            )}
                          </div>
                        </div>

                        <div className="form-outline mb-2">
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
                            placeholder="Address"
                            id="exampleFormControlTextarea1"
                            autoComplete="off"
                            rows="3"
                            onChange={this.onChangeFieldHandler}
                          ></textarea>

                          {errorMsgs.address && (
                            <small className="form-text text-danger ">
                              {errorMsgs.address}
                            </small>
                          )}
                        </div>

                        <div className="d-flex justify-content-center">
                          <button
                            type="submit"
                            className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                          >
                            {this.state.isUpdateFlow ? "Update" : "Create"}
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
    user_profile_info: state.emp_profile.user_profile_info,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    create_employee: (emp_reg_data, history) =>
      dispatch(create_employee(emp_reg_data, history)),

    update_employee: (emp_update_data, history) =>
      dispatch(update_employee(emp_update_data, history)),

    emp_profile: (id) => dispatch(emp_profile(id)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchtoProps)(EmpRegistration)
);
