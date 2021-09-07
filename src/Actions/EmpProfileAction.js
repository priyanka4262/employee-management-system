import axios from "axios";
import { EMPDATA } from "./Constants";

export const emp_profile = (id) => (dispatch) => {
  const url = `http://localhost:8080/users/empdetails/${id}`;
  console.log(url);
  axios
    .get(url)
    .then((response) => {
      console.log(response);
      dispatch({
        type: EMPDATA,
        user_profile_info: response.data.data,
      });
    })
    .catch((error) => {
      return error;
    });
};
