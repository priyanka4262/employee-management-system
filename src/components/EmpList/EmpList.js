import React, { Component } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import EmpProfile from "../EmpProfile/EmpProfile";
import { is_loading_action } from "../../Actions/LoaderAction";
import { emp_profile } from "../../Actions/EmpProfileAction";
import "./EmpList.scss";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <span className="threedots" />
  </a>
));

const usersPerPage = 10;
class EmpList extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      searchText: "",
      pageNumber: 0,
      displayUsers: [],
      menuitems: false,
      viewDetails: false,
    };
  }

  componentDidMount = () => {
    const token = localStorage.getItem("token");
    this.props.is_loading_action(true);
    axios
      .get("http://localhost:8080/users/allemployees")
      .then((response) => {
        this.setState({
          users: response.data.data,
          displayUsers: response.data.data.slice(0, usersPerPage),
        });
        this.props.is_loading_action(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  changePage = ({ selected }) => {
    const { users } = this.state;
    const usersVisited = selected * usersPerPage;
    this.setState({
      pageNumber: selected,
      displayUsers: users.slice(usersVisited, usersVisited + usersPerPage),
    });
  };

  onSearchFieldHandler = (event) => {
    this.setState({
      searchText: event.target.value,
    });
  };
  onEditHandler = (id) => {
    const pathName = this.props.location.pathname;
    console.log(pathName);
    this.props.history.push(`${pathName}/editemp/${id}`);
  };

  onViewHandler = (id) => {
    let history = this.props.history;
    this.props.emp_profile(id);
    history.push("./UserProfile");
  };
  onDelete = (id) => {
    axios
      .get(`http://localhost:8080/users/deleteEmployee/${id}`)
      .then((response) => {
        console.log(response);
        if (response.data.code === 0) {
          axios
            .get("http://localhost:8080/users/allemployees")
            .then((response) => {
              this.setState({
                users: response.data.data,
                displayUsers: response.data.data.slice(0, usersPerPage),
              });
              this.props.is_loading_action(false);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((err) => console.log(err));
  };
  onDeleteHandler = (id) => {
    console.log("delete emp=", id);
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <div className="react-confirm-alert-body">
              <h1>Are you sure?</h1>
              <p>You want to delete this file?</p>
              <div class="react-confirm-alert-button-group">
                <button className="btn-primary" onClick={onClose}>
                  No
                </button>
                <button
                  className="btn-primary"
                  onClick={() => {
                    this.onDelete(id);
                    onClose();
                  }}
                >
                  Yes, Delete it!
                </button>
              </div>
            </div>
          </div>
        );
      },
    });
  };

  render() {
    const { searchText, displayUsers, viewDetails } = this.state;
    const pageCount = Math.ceil(this.state.users.length / usersPerPage);
    let serialNumber = this.state.pageNumber * usersPerPage + 1;

    let newUsersList = displayUsers.filter(
      (user) =>
        user.employeeId == searchText ||
        user.employeeName?.toLowerCase().includes(searchText?.toLowerCase()) ||
        user.designation?.toLowerCase().includes(searchText?.toLowerCase()) ||
        user.status?.toLowerCase().includes(searchText?.toLowerCase()) ||
        user.personalEmail?.toLowerCase().includes(searchText?.toLowerCase())
    );

    return (
      <div>
        <div className="col-md-10 table-div">
          <div>
            <input
              type="text"
              name="search"
              value={this.state.search}
              placeholder="Search"
              className="form-control form-control-md"
              onChange={this.onSearchFieldHandler}
            />
          </div>
          <div>
            <table
              className="table table-striped 
          table-bordered table-hover table-md
          mt-3
          "
            >
              <thead>
                <tr>
                  <th scope="col">Serial No</th>
                  <th scope="col">Employee Name</th>
                  <th scope="col">Employee ID</th>
                  <th scope="col">Designation</th>
                  <th scope="col">Status</th>
                  <th scope="col">Company EmailID</th>
                  <th scope="col">More Options</th>
                </tr>
              </thead>
              <tbody>
                {newUsersList.map((user, index) => (
                  <tr key={user.employeeId + user.employeeName}>
                    <td>{index + serialNumber} </td>
                    <td>{user.employeeName}</td>
                    <td>{user.employeeId} </td>
                    <td>{user.designation}</td>
                    <td>{user.status}</td>
                    <td>{user.personalEmail}</td>
                    <td>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle as={CustomToggle} />
                        <Dropdown.Menu size="sm" title="">
                          <Dropdown.Item
                            onClick={() => this.onEditHandler(user._id)}
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => this.onViewHandler(user._id)}
                          >
                            View
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => this.onDeleteHandler(user._id)}
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            onPageChange={this.changePage}
            pageCount={pageCount}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    isLoading: state.loader,
    emp_profile_info: state.emp_profile,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    is_loading_action: (isLoading) => dispatch(is_loading_action(isLoading)),
    emp_profile: (id) => dispatch(emp_profile(id)),
  };
};
export default connect(mapStateToProps, mapDispatchtoProps)(EmpList);
