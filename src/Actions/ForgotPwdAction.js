import axios from "axios";
import { FORGOT_PWD_OTP } from "./Constants";
import { FORGOT_PWD_EMAIL } from "./Constants";

export const forgot_pwd_action = (email) => (dispatch) => {
  const url = "http://localhost:8080/users/otpgeneration";
  axios
    .post(url, email)
    .then((response) => {
      console.log(response);
      dispatch({
        type: FORGOT_PWD_OTP,
        forgot_pwd_otp: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};
export const get_email_action = (email) => (dispatch) => {
  dispatch({
    type: FORGOT_PWD_EMAIL,
    forgot_pwd_email: email,
  });
};
