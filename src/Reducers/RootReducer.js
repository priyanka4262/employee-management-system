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

const rootReducer = () =>
  combineReducers({
    emp_login: EmployeeLoginReducer,
    emp_reg: CreateEmpReducer,
    emp_update: UpdateEmpReducer,
    forgot_pwd: ForgotPwdReducer,
    loader: LoaderReducer,
    alert_var: AlertVarReducer,
    emp_profile: EmpProfileReducer,
    clear_data: ClearStoreReducer,
  });

// const rootReducer = (state, action) => {
//   // console.log(state, action);
//   if (action.type === CLEAR_DATA) {
//     state = undefined;
//   }

//   return appReducer(state, action);
// };

export default rootReducer;
