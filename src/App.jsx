import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css'; 
import LandingPage from './components/Landingpage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './components/Products';

function App() {
  return (
    <Products />
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<LandingPage />} />
    //     <Route path="/Login" element={<Login />} />
    //     <Route path="/Signup" element={<Signup />} />
    //   </Routes>
    // </Router>
  );
}


export default App;


