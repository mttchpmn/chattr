import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "nes.css/css/nes.min.css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App className="app" />
  </React.StrictMode>,
  document.getElementById("root")
);
