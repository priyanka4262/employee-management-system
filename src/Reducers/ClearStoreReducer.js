import { CLEAR_DATA } from "../Actions/Constants";
import { CLEAR_USER_DATA } from "../Actions/Constants";

const initialState = {};
export default function (state = initialState, action) {
  console.log("in clear store reducer");

  switch (action.type) {
    case CLEAR_DATA:
      return {
        ...state,
        emp_login: null,
        emp_reg: null,
      };
    // case CLEAR_USER_DATA:
    //   return {
    //     ...state,
    //     emp_profile: null,
    //   };

    default:
      return state;
  }
}
