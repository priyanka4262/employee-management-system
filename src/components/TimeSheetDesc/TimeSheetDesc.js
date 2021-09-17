import React, { Component } from "react";

export default class TimeSheetDesc extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Task</th>
              <th scope="col">Hours</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>
                <input type="text"></input>
              </td>
              <td>
                <input type="text"></input>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>
                <input type="text"></input>
              </td>
              <td>
                <input type="text"></input>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>
                <input type="text"></input>
              </td>
              <td>
                <input type="text"></input>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
