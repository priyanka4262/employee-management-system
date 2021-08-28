import { REGDATA } from "../Actions/Constants";

const initialState = {};
export default function (state = initialState, action) {
  //console.log("action in reducer", action);

  switch (action.type) {
    case REGDATA:
      return {
        ...state,
        emp_reg: action.user_reg_info,
      };
    default:
      return state;
  }
}
