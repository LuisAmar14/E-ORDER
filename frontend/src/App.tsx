import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './features/home/Home';
import EditProfile from './features/profile/EditProfile';
import Cart from './features/cart/Cart';
import Checkout from './features/cart/Checkout';
import './index.css';
import MostP from './features/products/MostPopular';
import TV from './features/products/TV';
import Computers from './features/products/Computer';
import Acc from './features/products/Accessories';
import Cell from './features/products/Cellphones';
import Vid from './features/products/Videogames';
import AuthPage from './features/auth/Authpage';
// Tipamos el componente App como React.FC
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/signin" element={<AuthPage />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/most-popular" element={<MostP />} />
        <Route path="/category/TV" element={<TV/>}/>
        <Route path="/category/computers" element={<Computers/>}/>
        <Route path="/category/appliances" element={<Acc/>}/>
        <Route path="/category/cellphones" element={<Cell/>}/>
        <Route path="/category/videogames" element={<Vid/>}/>
      </Routes>
    </Router>
  );
};

export default App;
