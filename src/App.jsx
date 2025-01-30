import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import InventoryList from './components/InventoryList';
import InventoryDetails from './components/InventoryDetails';
import InventoryRegister from './components/InventoryRegister';
import EditarInventario from "./components/InvetoryEdit"; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/inventarios" element={<InventoryList />} />
        <Route path="/inventarios/:id" element={<InventoryDetails />} />
        <Route path="/editar/:id" element={<EditarInventario />} />
        <Route path="/registro" element={<InventoryRegister />} />
      </Routes>
    </Router>
  );
};

export default App;
