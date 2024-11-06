import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './page/Login';
import Profile from './components/Profile';
import SalesOfficerRoutes from './page/sales-officer';
import Addorder from './components/Addorder';
import MerchantPage from './page/MerchantPage'; 
import ASMPage from './page/ASMPage';
import ShopPage from './page/ShopPage';
import ForgotPass from './components/ForgotPassword'
import MerchantConfirm from './components/MerchantConfirm';
function App() {
  return (
<Router>
  <Routes>
    <Route path='/merchant/success' element={<MerchantConfirm />} />
    <Route path="/login" exact element={<Login />} />
    <Route path="/profile/:userId" element={<Profile />} />
    <Route path="/sales-officer" element={<SalesOfficerRoutes />} />
    <Route path="/shops/:routeId" element={<ShopPage />} />
    <Route path="/order/:shopId" element={<Addorder />} />
    <Route path="/merchant" element={<MerchantPage />} />
    <Route path="/asm" element={<ASMPage />} />
    <Route path="/forgot-password" element={<ForgotPass />} />
  </Routes>
</Router>
  );
}

export default App;