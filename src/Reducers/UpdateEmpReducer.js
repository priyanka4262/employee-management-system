import { UPDATEDATA } from "../Actions/Constants";

const initialState = {};
export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATEDATA:
      return {
        ...state,
        emp_update: action.user_update_info,
      };
    default:
      return state;
  }
}
