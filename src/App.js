import "./styles.css";
import Signup from "./pages/auth/signup";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import UploadPhoto from "./pages/upload-photo";
import SelectCategory from "./pages/select-category";
import EmailVerification from "./pages/sendmail";
import Alu from "./pages/alu";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/upload-photo" element={<UploadPhoto />} />
        <Route path="/signup/select-category" element={<SelectCategory />} />
        <Route path="/signup/email-verification" element={<EmailVerification/>} />
        <Route path="/signup/alu" element={<Alu />}/>
      </Routes>
    </div>
  );
}

export default App;
