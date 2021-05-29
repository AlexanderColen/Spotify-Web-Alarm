import React from "react";
import logo from "../../resources/spotify.png";
import { Alarm } from "../alarm/Alarm";
import { Authorization } from "../authorization/Authorization";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <h1>Alarm Clock</h1>
      </header>
      <div className="container">
        <Authorization />
        <Alarm />
      </div>
    </div>
  );
}

export default App;
