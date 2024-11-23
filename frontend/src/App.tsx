import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Home from './public/features/home/Home';
import AuthPage from './public/features/auth/Authpage';
import TV from './public/features/products/TV';
import Computers from './public/features/products/Computer';
import Acc from './public/features/products/Accessories';
import Cell from './public/features/products/Cellphones';
import Vid from './public/features/products/Videogames';
import HomeA from './auth/features/home/Home';
import EditProfileA from './auth/features/profile/EditProfile';
import CartA from './auth/features/cart/Cart';
import CheckoutA from './auth/features/cart/Checkout';
import TVA from './auth/features/products/TV';
import ComputersA from './auth/features/products/Computer';
import AccA from './auth/features/products/Accessories';
import CellA from './auth/features/products/Cellphones';
import VidA from './auth/features/products/Videogames';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/profile/signin" element={<AuthPage />} />
          
          <Route path="/category/TV" element={<TV />} />
          <Route path="/category/computers" element={<Computers />} />
          <Route path="/category/appliances" element={<Acc />} />
          <Route path="/category/cellphones" element={<Cell />} />
          <Route path="/category/videogames" element={<Vid />} />

          {/* Rutas protegidas */}
          <Route
            path="/auth/home"
            element={
              <ProtectedRoute>
                <HomeA />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/editprofile"
            element={
              <ProtectedRoute>
                <EditProfileA />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth/cart"
            element={
              <ProtectedRoute>
                <CartA />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth/checkout"
            element={
              <ProtectedRoute>
                <CheckoutA />
              </ProtectedRoute>
            }
          />
        
          <Route
            path="/auth/category/TV"
            element={
              <ProtectedRoute>
                <TVA />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth/category/computers"
            element={
              <ProtectedRoute>
                <ComputersA />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth/category/appliances"
            element={
              <ProtectedRoute>
                <AccA />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth/category/cellphones"
            element={
              <ProtectedRoute>
                <CellA />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth/category/videogames"
            element={
              <ProtectedRoute>
                <VidA />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
