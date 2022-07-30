import "./App.css";
import Navbar from "./Components/Navbar";
import AddFriend from "./Components/AddFriend";
import { Routes, Route, Navigate } from "react-router";
import Home from "./Components/Home";
import PrivateComponent from "./Components/PrivateComponent";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import VerifyEmail from "./Components/VerifyEmail";
import PageNotFound from "./Components/PageNotFound";
import ForgotPassword from "./Components/ForgotPassword";
import SendMail from "./Components/SendMail";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add-a-new-friend" element={<AddFriend />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verifyemail" element={<VerifyEmail />} />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="sendmail" element={<SendMail />} />
      </Routes>
    </>
  );
}

export default App;
