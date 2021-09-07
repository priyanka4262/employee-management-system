import { ALERT_VAR } from "./Constants";
export const alert_var_action = (redirectFrom) => (dispatch) => {
  console.log("Action called");
  dispatch({
    type: ALERT_VAR,
    redirectFrom: redirectFrom,
  });
};
