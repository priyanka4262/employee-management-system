import React, { Component } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./EmpList.scss";

const usersPerPage = 10;
class EmpList extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      searchText: "",
      pageNumber: 0,
      displayUsers: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    axios
      .get("http://localhost:8080/users/allemployees")
      .then((response) => {
        this.setState({
          users: response.data.data,
          displayUsers: response.data.data.slice(0, usersPerPage),
          isLoading: false,
        });
      })
      .catch((error) => console.log(error));
  }
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
    const { searchText, displayUsers, isLoading } = this.state;
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
        <div>
          {isLoading && (
            <div className="progress progress-div">
              <div
                className="progress-bar w-75  progress-bar-div progress-bar-striped"
                role="progressbar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          )}
        </div>
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
export default EmpList;
