import React from "react";
import { Routes, Route } from "react-router-dom";
import MainView from "./pages/Mainview";
import DetailView from "./pages/Detailview";
import BasicExample from "./pages/notfound";
import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainView />} />
      <Route path="/detail/:id" element={<DetailView />} />
      <Route path="/notfound" element={<BasicExample />} />
    </Routes>
  );
};

export default App;
