import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Crypto from "./components/Crypto";

function App() {
  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
      )
      .then((res) => {
        setCryptos(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredCryptos = cryptos.filter((crypto) =>
    crypto.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1 className="crypto-text">Crypto-Lens</h1>
      <div className="crypto-search">
        <form>
          <input
            type="text"
            placeholder="Search"
            className="crypto-input"
            onChange={handleChange}
          />
        </form>
      </div>
      {filteredCryptos.map((crypto) => {
        return (
          <Crypto
            name={crypto.name}
            image={crypto.image}
            symbol={crypto.symbol}
            price={crypto.current_price}
            marketCap={crypto.market_cap}
            priceChange={crypto.price_change_percentage_24h}
            volume={crypto.total_volume}
          />
        );
      })}
    </div>
  );
}

export default App;
