import React, { useEffect, useRef } from 'react'
import { Button, Form } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { cart_saveShippingAddress } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingPage = () => {
  const { shippingAddress } = useSelector(state => state.cart)
  const addressRef = useRef();
  const cityRef = useRef();
  const postalCodeRef = useRef();
  const countryRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    addressRef.current.value = shippingAddress.address;
    cityRef.current.value = shippingAddress.city;
    postalCodeRef.current.value = shippingAddress.postalCode;
    countryRef.current.value = shippingAddress.country;
  }, [shippingAddress])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(cart_saveShippingAddress({
      address: addressRef.current['value'],
      city: cityRef.current['value'],
      postalCode: postalCodeRef.current['value'],
      country: countryRef.current['value'],
    }))
    navigate('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address' className='mt-3'>
          <Form.Label>Address</Form.Label>
          <Form.Control type='text' placeholder='Enter your address' ref={addressRef} required />
        </Form.Group>
        <Form.Group controlId='city' className='mt-3'>
          <Form.Label>City</Form.Label>
          <Form.Control type='text' placeholder='Enter your city' ref={cityRef} required />
        </Form.Group>
        <Form.Group controlId='postalCode' className='mt-3'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control type='text' placeholder='Enter Postal Code' ref={postalCodeRef} required />
        </Form.Group>
        <Form.Group controlId='country' className='mt-3'>
          <Form.Label>Country</Form.Label>
          <Form.Control type='text' placeholder='Enter Country name' ref={countryRef} required />
        </Form.Group>
        <Button type="submit" variant="primary" className='mt-3'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingPage