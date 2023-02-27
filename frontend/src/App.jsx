import Header from "./component/Header";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Dahboard from "./pages/Dahboard";
import Otp from "./pages/Otp";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/dashboard" element={<Dahboard />} />
          <Route path="/user/otp" element={<Otp />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
