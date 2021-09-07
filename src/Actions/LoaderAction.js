import { LOADER } from "./Constants";
export const is_loading_action = (isLoading) => (dispatch) => {
  dispatch({
    type: LOADER,
    isLoading: isLoading,
  });
};
