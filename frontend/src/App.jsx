import { Route, BrowserRouter, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AdminRoutes from "./components/AdminRoutes";
import Envelope from "./components/Envelope";
import { SayaraAndBishwas } from "./pages/weddings";

import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Envelope />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/sayara-and-bishwas" element={<SayaraAndBishwas />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
