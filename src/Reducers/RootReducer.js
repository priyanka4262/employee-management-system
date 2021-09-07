import { combineReducers } from "redux";
import EmployeeLoginReducer from "./EmployeeLoginReducer";
import CreateEmpReducer from "./CreateEmpReducer";
import ForgotPwdReducer from "./ForgotPwdReducer";
import LoaderReducer from "./LoaderReducer";
import AlertVarReducer from "./AlertVarReducer";
import EmpProfileReducer from "./EmpProfileReducer";

const rootReducer = () =>
  combineReducers({
    emp_login: EmployeeLoginReducer,
    emp_reg: CreateEmpReducer,
    forgot_pwd: ForgotPwdReducer,
    loader: LoaderReducer,
    alert_var: AlertVarReducer,
    emp_profile: EmpProfileReducer,
  });

// const rootReducer = (state, action) => {
//   if (action.type === CLEAR_DATA) {
//     state = undefined;
//   }
//   return appReducer(state, action);
// };
//
export default rootReducer;
