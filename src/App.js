import { Switch, Route } from "react-router";
import "./App.scss";
import EmployeeLogin from "./components/LoginComponent/EmployeeLogin";
import Homepage from "./components/HomeComponent/Homepage";
import ForgotPwd from "./components/ForgotPwd/ForgotPwd";
import ResetPwd from "./components/ResetPwd/ResetPwd";
function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={EmployeeLogin}></Route>
        <Route path="/Homepage" component={Homepage}></Route>
        <Route exact path="/ForgotPwd" component={ForgotPwd}></Route>
        <Route path={"/ResetPwd/:email"} component={ResetPwd}></Route>
      </Switch>
    </>
  );
}

export default App;
