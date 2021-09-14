import axios from "axios";
import { FETCH_ITEMS, LOGIN_ERR, LOADER } from "./Constants";
import { toast } from "react-toastify";

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
        dispatch({
          type: LOGIN_ERR,
          login_err: false,
        });
      } else {
        dispatch({
          type: LOGIN_ERR,
          login_err: true,
        });

        toast.warn("Invalid credentials! please try again", {
          position: "top-center",
        });
        dispatch({
          type: LOADER,
          isLoading: false,
        });
      }
      localStorage.setItem("token", response.data.token);
      dispatch({
        type: FETCH_ITEMS,
        user_info: response.data,
      });
    });
  };
