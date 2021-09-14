import React, { Component } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { is_loading_action } from "../../Actions/LoaderAction";
import { connect } from "react-redux";
import "./MyReportees.scss";

const usersPerPage = 10;
class MyReportees extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      searchText: "",
      pageNumber: 0,
      displayUsers: [],
    };
  }

  componentDidMount = () => {
    // this.props.is_loading_action(true);
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   this.props.history.push("./");
    // }
    let id = this.props?.user_info?.emp_login?.data?._id;
    console.log(
      "id in c did mount of myreportees",
      id,
      `http://localhost:8080/users/myreportees/${id}`
    );
    axios
      .get(`http://localhost:8080/users/myreportees/${id}`)
      .then((response) => {
        console.log(response, "response from my reportees");
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
    console.log("search triggered");
    this.setState({
      searchText: event.target.value,
    });
  };
  render() {
    console.log(this.props.user_info);

    const { searchText, displayUsers } = this.state;
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
    console.log(newUsersList);
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
  //console.log(state);
  return {
    isLoading: state.loader,
    user_info: state.emp_login,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    is_loading_action: (isLoading) => dispatch(is_loading_action(isLoading)),
  };
};
export default connect(mapStateToProps, mapDispatchtoProps)(MyReportees);
