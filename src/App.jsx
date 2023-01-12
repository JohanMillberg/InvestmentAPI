// import logo from './logo.svg';
import "./App.css";
import PlotForm from "./components/PlotForm.jsx";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <h1>Investment API</h1>
        </header>
        <PlotForm />
      </div>
    </QueryClientProvider>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
