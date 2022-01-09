import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//components
import AppNav from "./components/AppNav";
import Home from './components/pages/Home'
import TaskList from './components/pages/TaskList'
import ConfirmEmail from "./components/pages/ConfirmEmail";
import ResetPassword from "./components/pages/ResetPassword";
import ForgotPassword from "./components/pages/ForgotPassword";

function App() {
  return (
    <Router>
      <AppNav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/tasklist" element={<TaskList />} />
        <Route path="/confirmEmail" element={<ConfirmEmail />} />
        <Route exact path="/resetPassword" element={<ResetPassword />} />
        <Route exact path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
