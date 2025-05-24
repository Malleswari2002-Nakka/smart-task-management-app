import Dashboard from "./Dashboard";
import Tasks from "./Tasks";
import Login from "./Login";
import Signup from "./Signup";
import AddTask from "./AddTask";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import Profile from "./Profile";
// import Tasks from "./Tasks";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Dashboard />}></Route>
        <Route path="/logout" element={<Login />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/tasks" element={<Tasks />}></Route>
        <Route path="/addtask" element={<AddTask />}></Route>
        <Route path="/admindashboard" element={<AdminDashboard />}></Route>
      </Routes>
    </div>
  );
};

export default App;
