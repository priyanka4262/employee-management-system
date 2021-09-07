import { createStore, applyMiddleware } from "redux";
import rootReducer from "../Reducers/RootReducer";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};

export default function configureStore(preloadedState) {
  const middleware = [thunkMiddleware];
  const store = createStore(
    rootReducer(),
    preloadedState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  return store;
}
