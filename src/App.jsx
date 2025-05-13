import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/Cartdetail';
import React from 'react';
import './App.css'; 
import LandingPage from './components/Landingpage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductCard from './components/Productcard';
import Navbar from './components/Navbar';
import ProductPage from './components/Products';
import Cart from './pages/cart';

function App() {
  return (
      <CartProvider>
    <Router>
      <div className='md:min-h-screen'>
        <Navbar />
        <main className="">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      </main>
      </div>
    </Router>
    </CartProvider>
  );
}


export default App;


