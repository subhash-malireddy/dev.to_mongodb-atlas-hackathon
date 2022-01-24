import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './styles/general.scss'
import './styles/tasks.scss'

//components
import AppNav from "./components/AppNav";
import Home from './components/pages/Home'

import ConfirmEmail from "./components/pages/ConfirmEmail";
import ResetPassword from "./components/pages/ResetPassword";
import ForgotPassword from "./components/pages/ForgotPassword";
import Tasks from "./components/pages/Tasks";

function App() {
  return (
    <Router>
      <AppNav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/confirmEmail" element={<ConfirmEmail />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route exact path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
