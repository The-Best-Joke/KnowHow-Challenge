import { MantineProvider } from "@mantine/core";
import "./App.css";
import { HeaderSimple } from "./components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className="App">
        <HeaderSimple
          links={[
            { link: "/", label: "Search" },
            { link: "/saved", label: "Saved Gifs" },
          ]}
        />
        <Outlet />
      </div>
    </MantineProvider>
  );
}

export default App;
