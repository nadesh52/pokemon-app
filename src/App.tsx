import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import PokemonsTable from "./PokemonsTable";
import MainLayout from "./layouts/MainLayout";
import SinglePage from "./SinglePage";

function App() {
  return (
    <Routes>
      <Route path="/p" element={<PokemonsTable layout={MainLayout} />} />
      <Route path="/p/:id" element={<SinglePage />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
