import { Switch, Route } from "react-router";
import "./App.scss";
import EmployeeLogin from "./components/LoginComponent/EmployeeLogin";
import Homepage from "./components/HomeComponent/Homepage";
import ForgotPwd from "./components/ForgotPwd/ForgotPwd";
import ResetPwd from "./components/ResetPwd/ResetPwd";
import ChangePwd from "./components/ChangePwd/ChangePwd";
import Loader from "./components/Loader/Loader";

import { is_loading_action } from "./Actions/LoaderAction";
import { connect } from "react-redux";
const App = (props) => {
  const isLoading = props.isLoading.isLoading;

  return (
    <div>
      {isLoading && <Loader></Loader>}

      <Switch>
        <Route exact path="/" component={EmployeeLogin}></Route>
        <Route path="/homepage" component={Homepage}></Route>
        <Route path="/changepwd" component={ChangePwd}></Route>
        <Route exact path="/forgotpwd" component={ForgotPwd}></Route>
        <Route path={"/resetpwd"} component={ResetPwd}></Route>
      </Switch>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isLoading: state.loader,
  };
};

export default connect(mapStateToProps, { is_loading_action })(App);
