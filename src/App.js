import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" >
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
