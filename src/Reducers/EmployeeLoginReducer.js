import { FETCH_ITEMS, LOGIN_ERR } from "../Actions/Constants";

const initialState = {};
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return {
        ...state,
        emp_login: action.user_info,
      };
    case LOGIN_ERR:
      return {
        ...state,
        get_login_error: action.login_err,
      };
    default:
      return state;
  }
}
