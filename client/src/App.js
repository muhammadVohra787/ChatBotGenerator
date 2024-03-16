import { Routes, Route } from "react-router-dom";
import NotFound1 from "./views/not-found";
import Home from "./views/home";
import SecureRoute1 from "./views/SecureRoute1";
import PublicRoute from "./views/PublicRoute";
import SignIn from "./views/SignInPage";
import PrivateRoutes from "./PrivateRoutes";
import ChangePassword from "./views/password/ChangePassword";
import ForgotPasswordPage from "./views/password/ForgotPasswordPage";
import TokenVerify from "./components/userInput/TokenVerification";
import SingleSelect from "./components/TypesOfInput/SingleSelect";
import DragNDrop from "./views/DragNDrop";

import "./index.css";
import { ChatPage } from "./views/Test";
import TextMessage from "./components/TypesOfInput/TextMesage";
import Dashboard from "./views/Dashboard";
function App() {
  const handleResponse = (data, index) => {
    console.log(data);
  };
  return (
    <Routes>
      <Route path="/startchat" element={<SingleSelect />} />
      <Route
        path="/test"
        element={
          <SingleSelect maximized={true} handleResponse={handleResponse} />
        }
      />

      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound1 />} />
      <Route path="/login" element={<SignIn />} />
      <Route
        element={<PublicRoute text={"Welcome to Public Route"} />}
        path="publicroute1"
      />
      <Route element={<ForgotPasswordPage />} path="/forgotPassword" />
      <Route element={<TokenVerify />} path="/cf83e1357eefb8bdf/:email" />
      {/* Secure Routes */}
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dnd/:chatname" element={<DragNDrop />} />
        <Route element={<ChangePassword />} path="/changePass" exact />
      </Route>
      {/* Secure Routes Ends here*/}
    </Routes>
  );
}

export default App;
