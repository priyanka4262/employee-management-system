import { combineReducers } from "redux";
import EmployeeLoginReducer from "./EmployeeLoginReducer";
import { connectRouter } from "connected-react-router";

const rootReducer = () =>
  combineReducers({
    // router: connectRouter(history),
    emp_login: EmployeeLoginReducer,
  });

export default rootReducer;
