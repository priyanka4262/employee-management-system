import { CLEAR_DATA } from "./Constants";
import { CLEAR_USER_DATA } from "./Constants";

export const clear_store = () => (dispatch) => {
  console.log("clear store action ");
  dispatch({
    type: CLEAR_DATA,
  });
};
// export const clear_user_profile = () => (dispatch) => {
//   // console.log("clear store action ");
//   dispatch({
//     type: CLEAR_USER_DATA,
//   });
// };
