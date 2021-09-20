import { EMPDATA } from "../Actions/Constants";

const initialState = {};
export default function (state = initialState, action) {
  switch (action?.type) {
    case EMPDATA:
      return {
        ...state,
        user_profile_info: action.user_profile_info,
      };
    default:
      return state;
  }
}
