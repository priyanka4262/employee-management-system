import axios from "axios";

import { REGDATA } from "./Constants";
//import { push } from "connected-react-router";

export const create_employee = (emp_reg_data, history) => (dispatch) => {
  const url = "http://localhost:8080/users/createEmployee";
  axios
    .post(url, emp_reg_data)
    .then((response) => {
      history.push("./RegSuccess");
      localStorage.setItem("empToken", response.data.token);
      dispatch({
        type: REGDATA,
        user_reg_info: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};
