import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Routes, Route, Outlet} from "react-router-dom";
import {store} from "./store";
import "./styles/App.css";
import {Home, About, NewGame, HighScores} from "./screens";
import {Game, City} from "./screens/game";
import {
  Collector,
  List as CollectorList,
  Buy as BuyFromCollector,
  SellSelect as SelectSellToCollector,
  Sell as SellToCollector,
} from "./screens/game/collector";

import {
  Auction,
  List as AuctionList,
  Buy as BuyFromAuction,
  Sell as SellAtAuction,
  SellSelect as SelectSellAtAuction,
} from "./screens/game/auction";
import {ErrorBoundary} from "./components";
import {
  Portfolio,
  List as PortfolioList,
  Detail as PortfolioDetail,
  Confirm as ConfirmMove,
} from "./screens/game/portfolio";
import {Shop, List as ShopList, Buy as ShopBuy} from "./screens/game/shop";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <main>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/new-game" element={<NewGame />} />
                <Route path="/high-scores" element={<HighScores />} />
                <Route path="/about" element={<About />} />
                <Route path="/game" element={<Game />}>
                  <Route path="city" element={<City />} />
                  <Route path="collector" element={<Collector />}>
                    <Route index element={<CollectorList />} />
                    <Route
                      path="buy/:artworkId"
                      element={<BuyFromCollector />}
                    />
                    <Route path="sell" element={<Outlet />}>
                      <Route index element={<SelectSellToCollector />} />
                      <Route path=":artworkId" element={<SellToCollector />} />
                    </Route>
                  </Route>
                  <Route path="auction" element={<Auction />}>
                    <Route index element={<AuctionList />} />
                    <Route path="buy/:artworkId" element={<BuyFromAuction />} />
                    <Route path="sell" element={<Outlet />}>
                      <Route index element={<SelectSellAtAuction />} />
                      <Route path=":artworkId" element={<SellAtAuction />} />
                    </Route>
                  </Route>
                  <Route path="portfolio" element={<Portfolio />}>
                    <Route index element={<PortfolioList />} />
                    <Route path=":artworkId" element={<Outlet />}>
                      <Route index element={<PortfolioDetail />} />
                      <Route path=":destination" element={<ConfirmMove />} />
                    </Route>
                  </Route>
                  <Route path="shop" element={<Shop />}>
                    <Route index element={<ShopList />} />
                    <Route path="buy/:name" element={<ShopBuy />} />
                  </Route>
                </Route>
                <Route path="*" element={<p>There's nothing here.</p>} />
              </Routes>
            </ErrorBoundary>
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
