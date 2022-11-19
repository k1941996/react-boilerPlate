import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const DefinedRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>Hello</>} />

      </Routes>
    </BrowserRouter>
  );
};

export default DefinedRoutes;
