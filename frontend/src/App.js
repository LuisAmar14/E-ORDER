import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './features/home/Home';
import SignInSignUp from './features/auth/SignInSignUp';
import EditProfile from './features/profile/EditProfile';
import Cart from './features/cart/Cart';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/signin" element={<SignInSignUp />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;
