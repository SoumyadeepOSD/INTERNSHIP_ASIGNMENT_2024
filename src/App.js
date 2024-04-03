import "./styles.css";
import Signup from "./pages/auth/signup";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import UploadPhoto from "./pages/upload-photo";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/upload-photo" element={<UploadPhoto />} />
      </Routes>
    </div>
  );
}

export default App;
