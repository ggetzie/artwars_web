import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {store} from "./store";
import "./styles/App.css";
import {Home, About} from "./screens";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <header>
            <h1>Art Wars</h1>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <footer>
            <p>
              ©2022 <a href="https://kotsf.com">Kotsf LLC</a> and{" "}
              <a href="https://msteinberg.art">Monica Steinberg</a>
            </p>
          </footer>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
