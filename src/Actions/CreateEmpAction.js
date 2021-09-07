import axios from "axios";
import { toast } from "react-toastify";
import { REGDATA } from "./Constants";

export const create_employee = (emp_reg_data, history) => (dispatch) => {
  const url = "http://localhost:8080/users/createEmployee";
  axios
    .post(url, emp_reg_data)
    .then((response) => {
      localStorage.setItem("empToken", response.data.token);
      dispatch({
        type: REGDATA,
        user_reg_info: response.data,
      });
      toast("Employee registration successfull");
      history.push("./emplist");
    })
    .catch((error) => {
      return error;
    });
};
