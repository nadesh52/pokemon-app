import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import PokemonsTable from "./PokemonsTable";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/p" element={<PokemonsTable layout={MainLayout} />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
