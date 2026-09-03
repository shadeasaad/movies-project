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
import SignUp from "./components/SignUp";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function AppLayout() {
  const location = useLocation();
  const isSignUp = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      {!isSignUp && <Nav />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/TV" element={<TV />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/watch/:id" element={<Watch />} />
        </Routes>
      </div>
      {!isSignUp && <Footer />}
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