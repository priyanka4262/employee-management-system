import axios from "axios";
import { toast } from "react-toastify";
import { UPDATEDATA } from "./Constants";

export const update_employee = (emp_update_data, history) => (dispatch) => {
  console.log("employee update action");
  const url = "http://localhost:8080/users/updateuserdetails";
  axios
    .post(url, emp_update_data)
    .then((response) => {
      localStorage.setItem("empToken", response.data.token);
      dispatch({
        type: UPDATEDATA,
        user_update_info: response.data,
      });
      toast("Employee details updated succesfully");
      history.push("./emplist");
    })
    .catch((error) => {
      return error;
    });
};
