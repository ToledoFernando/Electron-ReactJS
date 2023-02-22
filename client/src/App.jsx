import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import BibliotecLoscal from "./pages/bibliotecaLocal/BibliotecLoscal";
import Download from "./pages/download/Download";
import { Gradient } from "./gradient";
import { useRef, useEffect } from "react";
import "./global.css";
import "./App.scss";

function App() {
  const gradient = new Gradient();

  const canvas = useRef();
  useEffect(() => {
    gradient.initGradient("#gradient-canvas");
  }, []);
  return (
    <div className="app">
      <canvas
        ref={canvas}
        id="gradient-canvas"
        data-js-darken-top
        data-transition-in
      />
      {/* <span></span>
      <span></span>
      <span></span>
      <span></span> */}
      <NavBar />
      <Routes>
        <Route path="/" element={<BibliotecLoscal />} />
        <Route path="/download" element={<Download />} />
      </Routes>
    </div>
  );
}

export default App;
