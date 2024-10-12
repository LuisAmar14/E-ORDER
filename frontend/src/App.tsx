import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './features/home/Home';
import SignInSignUp from './features/auth/SignInSignUp';
import EditProfile from './features/profile/EditProfile';
import Cart from './features/cart/Cart';
import Checkout from './features/cart/Checkout';
import MostP from './features/products/MostPopular';
// Tipamos el componente App como React.FC
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/signin" element={<SignInSignUp />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/most-popular" element={<MostP />} />
      </Routes>
    </Router>
  );
};

export default App;
