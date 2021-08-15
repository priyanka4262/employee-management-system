import { FETCH_ITEMS } from "../Actions/Constants";

const initialState = {};
export default function (state = initialState, action) {
  console.log("action in reducer", action);
  switch (action.type) {
    case FETCH_ITEMS:
      return {
        ...state,
        emp_login: action.user_info,
      };
    default:
      return state;
  }
}
