import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//components
import Home from './components/pages/Home'
import TaskList from './components/pages/TaskList'
import ConfirmEmail from "./components/pages/ConfirmEmail";
import ResetPassword from "./components/pages/ResetPassword";

function App() {
  return (
    <Router>
          <Routes>
            <Route exact path="/" element={<Home />}  />
            <Route exact path="/tasklist" element={<TaskList />}  />
            <Route exact path="/confirmEmail" element={<ConfirmEmail />}  />
            <Route exact path="/resetPassword" element={<ResetPassword />}  />
          </Routes>
    </Router>
  );
}

export default App;
