import { combineReducers } from "redux";
import EmployeeLoginReducer from "./EmployeeLoginReducer";
import CreateEmpReducer from "./CreateEmpReducer";
import { connectRouter } from "connected-react-router";

const rootReducer = () =>
  combineReducers({
    emp_login: EmployeeLoginReducer,
    emp_reg: CreateEmpReducer,
  });

export default rootReducer;
