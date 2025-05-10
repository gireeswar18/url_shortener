import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { Bounce, ToastContainer } from "react-toastify";
import DashBoard from "./pages/DashBoard";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen px-[16px] md:px-[64px]">
          <Navbar />
          <main className="flex-1">
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              newestOnTop={false}
              rtl={false}
              theme="colored"
              transition={Bounce}
            />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashBoard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
