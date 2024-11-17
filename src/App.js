import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './Components/signUpPackage/signUp'; 
import Login from './Components/loginPackage/login';
import Home from './Components/homePackage/home';
import ProductsList from './Components/productsPackage/products';  
import Cart from './Components/cartPackage/cart';
import Checkout from './Components/checkOutPackage/payment';
import Success from './Components/successOrder/sucessOrder'
import OrdenesUsuarios from './Components/checkOrders/userOrders'

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  return token ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/products/:CategoryId" element={<PrivateRoute><ProductsList /></PrivateRoute>} /> 
        <Route path="/cart/:userId" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/checkout/:userId" element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path="/Success" element={<PrivateRoute><Success /></PrivateRoute>} />
        <Route path="/ordenesUsuarios/:userId" element={<PrivateRoute><OrdenesUsuarios /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
