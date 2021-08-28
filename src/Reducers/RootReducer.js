import { combineReducers } from "redux";
import EmployeeLoginReducer from "./EmployeeLoginReducer";
import CreateEmpReducer from "./CreateEmpReducer";
import ForgotPwdReducer from "./ForgotPwdReducer";
import { connectRouter } from "connected-react-router";

const rootReducer = () =>
  combineReducers({
    emp_login: EmployeeLoginReducer,
    emp_reg: CreateEmpReducer,
    forgot_pwd: ForgotPwdReducer,
  });

export default rootReducer;
