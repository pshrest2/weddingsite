import React from "react";
import { Route, Routes } from "react-router-dom";
import Guests from "../admin/guests";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/weddings/:weddingId/guests" element={<Guests />} />
    </Routes>
  );
};

export default AdminRoutes;
