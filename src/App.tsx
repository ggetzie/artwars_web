import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {store} from "./store";
import "./styles/App.css";
import {Home, About, NewGame, HighScores} from "./screens";
import {Game, City} from "./screens/game";
import {Collector, List as CollectorList} from "./screens/game/collector";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new-game" element={<NewGame />} />
              <Route path="/high-scores" element={<HighScores />} />
              <Route path="/about" element={<About />} />
              <Route path="/game" element={<Game />}>
                <Route path="city" element={<City />} />
                <Route path="collector" element={<Collector />}>
                  <Route path="" element={<CollectorList />} />
                </Route>
                {/* <Route path="portfolio" element={<Portfolio />}>
                  <Route path="list" element={<PortfolioList />} />
                  <Route path=":artworkId" element={<PortfolioDetail />} />
                  <Route
                    path=":artworkId/:destination"
                    element={<PortfolioConfirm />}
                  />
                </Route>
                <Route path="collector" element={<Collector />}>
                  <Route path="list" element={<CollectorList />} />
                  <Route path="sell" element={<CollectorSellSelect />}>
                    <Route path=":artworkId" element={<CollectorSell />} />
                  </Route>
                </Route> */}
              </Route>
              <Route path="*" element={<p>There's nothing here.</p>} />
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
