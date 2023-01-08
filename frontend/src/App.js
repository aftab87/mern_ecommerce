import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Footer from './components/Footer';
import Header from './components/Header';
import Protected from './components/Protected';
import { CartPage, HomePage, LoginPage, OrderPage, PaymentPage, PlaceOrderPage, ProductPage, RegisterPage, ShippingPage, UserProfilePage, UsersEditPage, UsersPage } from './pages';


const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container >
          <Routes path="/">
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} shouldRevalidate />
            <Route path="register" element={<RegisterPage />} />
            <Route path='product/:id' element={<ProductPage />} />
            {/* '?' in path means optional */}
            <Route path='cart/:id?' element={<CartPage />} />
            <Route path='order/:id?' element={<OrderPage />} />
            <Route path="profile" element={<Protected redirect='profile' page={<UserProfilePage />} />} />
            <Route path="shipping" element={<Protected redirect='shipping' page={<ShippingPage />} />} />
            <Route path="payment" element={<Protected redirect='payment' page={<PaymentPage />} />} />
            <Route path="placeorder" element={<Protected redirect='placeorder' page={<PlaceOrderPage />} />} />
            <Route path='admin/'>
              <Route path='users/' element={<Protected admin redirect='admin/users/' page={<UsersPage />} />} />
              <Route path='users/:id/edit' element={<Protected admin redirect='admin/users/:id/edit' page={<UsersEditPage />} />} />
            </Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
