import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Guests from "../pages/admin/guests";

const Weddings = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="1">Sayara & Bishwas</Link>
        </li>
      </ul>
    </div>
  );
};
const Wedding = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="guests">Guests</Link>
        </li>
      </ul>
    </div>
  );
};

const AdminRoutes = () => {
  const location = useLocation();

  console.log(location);
  return (
    <Routes>
      <Route path="weddings" element={<Weddings />} />
      <Route path="weddings/:weddingId" element={<Wedding />} />
      <Route path="weddings/:weddingId/guests" element={<Guests />} />
    </Routes>
  );
};

export default AdminRoutes;
