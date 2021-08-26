import React, { Component } from "react";
import axios from "axios";
import "./EmpList.scss";

class EmpList extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:8080/users/allemployees")
      .then((response) => {
        console.log(response.data.data);
        this.setState({
          users: response.data.data,
        });
      })
      .catch((error) => console.log(error));
  }
  render() {
    const { users } = this.state;
    return (
      <div>
        <div className="row mt-5 w-100 overflow-auto">
          <div className="col heading-div">Name</div>
          <div className="col heading-div">Joined On</div>
          <div className="col heading-div">Designation</div>
          <div className="col heading-div">MobileNumber</div>
          <div className="col heading-div">Email</div>
          <div className="w-100"></div>
          {users.map((user) => (
            <>
              <div className="col data-div ">{user.employeeName}</div>
              <div className="col data-div">{user.joinedOn}</div>
              <div className="col data-div">{user.designation}</div>
              <div className="col data-div">{user.primaryMobile}</div>
              <div className="col data-div">{user.personalEmail}</div>
              <div className="w-100"></div>
            </>
          ))}
        </div>
      </div>
    );
  }
}
export default EmpList;
