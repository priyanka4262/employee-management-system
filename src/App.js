import { Switch, Route } from "react-router";
import "./App.scss";
import EmployeeLogin from "./components/LoginComponent/EmployeeLogin";
import Homepage from "./components/HomeComponent/Homepage";
import ForgotPwd from "./components/ForgotPwd/ForgotPwd";
import ResetPwd from "./components/ResetPwd/ResetPwd";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import ChangePwd from "./components/ChangePwd/ChangePwd";
import Loader from "./components/Loader/Loader";
function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={EmployeeLogin}></Route>
        <Route path="/homepage" component={Homepage}></Route>
        <Route path="/changepwd" component={ChangePwd}></Route>
        <Route path="/errorpage" component={ErrorPage}></Route>
        <Route exact path="/forgotpwd" component={ForgotPwd}></Route>
        <Route path={"/resetpwd"} component={ResetPwd}></Route>
      </Switch>
    </>
  );
}

export default App;
