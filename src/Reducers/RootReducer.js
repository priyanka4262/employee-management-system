import { combineReducers } from "redux";
import EmployeeLoginReducer from "./EmployeeLoginReducer";
import CreateEmpReducer from "./CreateEmpReducer";
import ForgotPwdReducer from "./ForgotPwdReducer";
import LoaderReducer from "./LoaderReducer";
import AlertVarReducer from "./AlertVarReducer";
import EmpProfileReducer from "./EmpProfileReducer";
import ClearStoreReducer from "./ClearStoreReducer";
import UpdateEmpReducer from "./UpdateEmpReducer";
import { CLEAR_DATA } from "../Actions/Constants";

let newState = {
  emp_login: {},
  emp_reg: {},
  emp_update: {},
  forgot_pwd: {},
  loader: {},
  alert_var: {},
  emp_profile:{}
};

const appReducer = combineReducers({
  emp_login: EmployeeLoginReducer,
  emp_reg: CreateEmpReducer,
  emp_update: UpdateEmpReducer,
  forgot_pwd: ForgotPwdReducer,
  loader: LoaderReducer,
  alert_var: AlertVarReducer,
  emp_profile: EmpProfileReducer,
  clear_data: ClearStoreReducer,
})

const rootReducer = (state, action) => {
  console.log(state, action, "actions")
  if (action?.type === 'CLEAR_DATA') {
    return appReducer(newState, action)
  }
  return appReducer(state, action)
}

export default rootReducer;
