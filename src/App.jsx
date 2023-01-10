// import logo from './logo.svg';
import "./App.css";
import Plot from "./components/Plot.jsx";
import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Plot />
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
