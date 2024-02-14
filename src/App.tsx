import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import PokemonsTable from "./pokemontable/PokemonsTable";
import MainLayout from "./layouts/MainLayout";
import SinglePage from "./SinglePage";
import SinglepageLayout from "./layouts/SinglePageLayout";
import LandingPage from "./landingpage/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/p" element={<PokemonsTable layout={MainLayout} />} />
      <Route path="/p/:id" element={<SinglePage layout={SinglepageLayout} />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}

export default App;
