import React from "react";
import {Provider} from "react-redux";
import {store} from "./store";
import "./styles/App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header>
          <h1>Art Wars</h1>
        </header>
        <main>
          <p>Hello</p>
        </main>
        <footer>
          <p>
            ©2022 <a href="https://kotsf.com">Kotsf LLC</a> and{" "}
            <a href="https://msteinberg.art">Monica Steinberg</a>
          </p>
        </footer>
      </div>
    </Provider>
  );
}

export default App;
