import { createStore, applyMiddleware } from "redux";
import rootReducer from "../Reducers/RootReducer";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
//import { createBrowserHistory } from "history";
const initialState = {};
//export const history = createBrowserHistory();
export default function configureStore(preloadedState) {
  const middleware = [thunkMiddleware];
  const store = createStore(
    rootReducer(),
    preloadedState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  return store;
}
