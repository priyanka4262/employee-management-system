import axios from "axios";

import { FETCH_ITEMS } from "./Constants";
//import { push } from "connected-react-router";

export const validate_credentials =
  (emp_credentials, history) => (dispatch) => {
    const url = "http://localhost:8080/users/login";
    axios.post(url, emp_credentials).then((response) => {
      history.push("./Homepage");
      localStorage.setItem("Token", response.data.token);
      dispatch({
        type: FETCH_ITEMS,
        user_info: response.data,
      });
      //push("./Homepage");
    });
  };
