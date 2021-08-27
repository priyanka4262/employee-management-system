import React, { Component } from "react";
import axios from "axios";
import "./EmpList.scss";

class EmpList extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      searchText: "",
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:8080/users/allemployees")
      .then((response) => {
        //  console.log(response.data.data);
        this.setState({
          users: response.data.data,
        });
      })
      .catch((error) => console.log(error));
  }
  onSearchFieldHandler = (event) => {
    console.log("search triggered");
    this.setState({
      searchText: event.target.value,
    });
  };
  render() {
    const { users, searchText } = this.state;

    let newUsersList = users.filter(
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

          <table
            className="table table-striped 
          table-bordered table-hover table-md
          mt-3"
          >
            <thead>
              <tr>
                <th scope="col">Employee Name</th>
                <th scope="col">Employee ID</th>
                <th scope="col">Designation</th>
                <th scope="col">Status</th>
                <th scope="col">Company EmailID</th>
              </tr>
            </thead>
            <tbody>
              {newUsersList.map((user) => (
                <tr key={user.employeeId + user.employeeName}>
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
      </div>
    );
  }
}
export default EmpList;
