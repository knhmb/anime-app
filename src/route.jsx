import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AnimeDetails from "./pages/AnimeDetails";

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
