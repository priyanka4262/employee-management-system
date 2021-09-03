import axios from "axios";
import { FETCH_ITEMS } from "./Constants";

export const validate_credentials =
  (emp_credentials, history) => (dispatch) => {
    const url = "http://localhost:8080/users/login";
    axios.post(url, emp_credentials).then((response) => {
      if (response.data.code === 1) {
        if (response.data.data.firstLogin) {
          history.push("./changepwd");
        } else {
          history.push("./homepage");
        }
      } else {
        history.push("./errorPage");
      }
      localStorage.setItem("Token", response.data.token);
      dispatch({
        type: FETCH_ITEMS,
        user_info: response.data,
      });
    });
  };
