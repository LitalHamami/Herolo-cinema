import React, { Component } from "react";
import "./App.css";
import Movies from "./containers/Movies/index";
import Layout from "./hoc/Layout/Layout";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout />
        <h1>Herolo Cinema </h1>
        <Movies />
      </div>
    );
  }
}

export default App;
