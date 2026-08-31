import Nav from "./components/nav";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HomePage from "./pages/HomePage";
import Movies from "./pages/Movies";
import TV from "./pages/TV";
import Anime from "./pages/Anime";
import Watch from "./pages/Watch";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Nav />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/TV" element={<TV />} />
            <Route path="/anime" element={<Anime />} />
            <Route path="/watch/:id" element={<Watch />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;