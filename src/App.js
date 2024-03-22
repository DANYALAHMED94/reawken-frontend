import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Setting from "./Pages/Setting";
import Pricing from "./Pages/Pricing";
import Forgot from "./Pages/Forgot";
import NewPassword from "./Pages/NewPassword";
import DocPage from "./Pages/DocPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./context";
import Modal from "./Components/Modal";
import Notification from "./Components/Notification";
import Blog from "./Pages/Blog";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setting/:id" element={<Setting />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/forget-password/:token" element={<NewPassword />} />
          <Route path="/doc/:id" element={<DocPage />} />
          <Route path="/modal" element={<Modal />} />
          <Route path="/notifications/:id" element={<Notification />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
        <ToastContainer />
      </UserContextProvider>
    </>
  );
}
export default App;
