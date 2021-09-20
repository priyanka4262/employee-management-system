import { LOADER } from "../Actions/Constants";

const initialState = {};
export default function (state = initialState, action) {
  switch (action?.type) {
    case LOADER:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    default:
      return state;
  }
}
