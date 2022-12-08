import { MantineProvider } from "@mantine/core";
import "./App.css";
import { HeaderSimple } from "./components/Header";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

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
      <Footer />
    </MantineProvider>
  );
}

export default App;
