import { combineReducers } from "redux";
import EmployeeLoginReducer from "./EmployeeLoginReducer";

const rootReducer = combineReducers({
  emp_login: EmployeeLoginReducer,
});

export default rootReducer;
