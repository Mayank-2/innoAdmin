import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminHomePage from "./components/Admin/AdminHomePage";
import NotFound from "./components/NotFoundLayout/NotFound";

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<AdminLogin/>}/>
      <Route path='/admin/home' element={<AdminHomePage/>}/>
      <Route exact path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
