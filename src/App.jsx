// import logo from './logo.svg';
import "./App.css";
import PlotForm from "./components/PlotForm.jsx";
import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Investment API</h1>
      </header>
      <PlotForm />
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
