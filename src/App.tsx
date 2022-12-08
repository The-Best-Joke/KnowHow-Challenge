import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SearchBar from "./components/SearchBar";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <SearchBar />
        </header>
      </div>
    </MantineProvider>
  );
}

export default App;
