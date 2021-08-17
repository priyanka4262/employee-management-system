import { Switch, Route } from "react-router";
import "./App.scss";
import EmployeeLogin from "./components/LoginComponent/EmployeeLogin";
import Homepage from "./components/HomeComponent/Homepage";
import DashBoard from "./components/DashBoard/DashBoard";
import Sidebar from "./components/Sidebar/Sidebar";
import HomeIconComponent from "./components/HomeIconComponent/HomeIconComponent";
import SidebarNew from "./components/SidebarNew/SidebarNew";
function App() {
  return (
    <>
      {/* <Sidebar></Sidebar> */}
      <Switch>
        <Route exact path="/" component={EmployeeLogin}></Route>
        <Route path="/Homepage" component={Homepage}></Route>
        {/* <Route exact path="/Homepage/DashBoard" component={DashBoard}></Route> */}
      </Switch>
    </>
  );
}

export default App;
