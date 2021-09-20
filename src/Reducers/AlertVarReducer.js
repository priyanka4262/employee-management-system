import { ALERT_VAR } from "../Actions/Constants";

const initialState = {};
export default function (state = initialState, action) {
  switch (action?.type) {
    case ALERT_VAR:
      return {
        ...state,
        redirectFrom: action.redirectFrom,
      };

    default:
      return state;
  }
}
