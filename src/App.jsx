import Nav from "./components/nav";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HomePage from "./pages/HomePage";
import Movies from "./pages/Movies";
import TV from "./pages/TV";
import Anime from "./pages/Anime";
import Watch from "./pages/Watch";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/Login";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function AppLayout() {
  const location = useLocation();
  const isSignUp = location.pathname === "/signup";
  const isLogIn = location.pathname === "/login";

  const showHeaderFooter = !isSignUp && !isLogIn;

  return (
    <div className="flex flex-col min-h-screen">
      {showHeaderFooter && <Nav />}
      <div className="flex-grow">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/TV" element={<TV />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/watch/:id" element={<Watch />} />
        </Routes>
      </div>
      {showHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;