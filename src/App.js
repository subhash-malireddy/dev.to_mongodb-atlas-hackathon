import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//components
import Home from './components/Home'
import TaskList from './components/TaskList'

function App() {
  const div2return = document.createElement('div')
  div2return.className = "App"
  let myContent = document.createElement('p')
  myContent.innerText = "This is done using javascript not react."
  div2return.appendChild(myContent)
  return (
    <Router>
          <Routes>
            <Route exact path="/" element={<Home />}  />
            <Route exact path="/tasklist" element={<TaskList />}  />
          </Routes>
    </Router>
  );
}

export default App;
