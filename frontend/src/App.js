import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Footer from './components/Footer';
import Header from './components/Header';
import { CartPage, HomePage, LoginPage, PaymentPage, ProductPage, RegisterPage, ShippingPage, UserProfilePage } from './pages';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container >
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path='/product/:id' element={<ProductPage />} />
            {/* '?' in path means optional */}
            <Route path='/cart/:id?' element={<CartPage />} />
            <Route path='/shipping' element={<ShippingPage />} />
            <Route path='/payment' element={<PaymentPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
