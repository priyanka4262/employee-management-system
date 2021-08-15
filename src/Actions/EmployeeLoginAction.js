import axios from "axios";
import { FETCH_ITEMS } from "./Constants";

export const validate_credentials = (emp_credentials) => (dispatch) => {
  console.log("action called");
  const url = "http://localhost:8080/users/login";
  axios.post(url, emp_credentials).then((response) => {
    console.log(response.data.token);
    dispatch({
      type: FETCH_ITEMS,
      user_info: response.data,
    });
    localStorage.setItem("Token", response.data.token);
  });
};
