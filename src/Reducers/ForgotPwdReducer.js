import { FORGOT_PWD_EMAIL, FORGOT_PWD_OTP } from "../Actions/Constants";
const initialState = {};
export default function (state = initialState, action) {
  switch (action?.type) {
    case FORGOT_PWD_OTP:
      return {
        ...state,
        get_otp: action.forgot_pwd_otp,
      };
    case FORGOT_PWD_EMAIL:
      return {
        ...state,
        get_email: action.forgot_pwd_email,
      };
    default:
      return state;
  }
}
