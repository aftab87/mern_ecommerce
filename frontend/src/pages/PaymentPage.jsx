import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { cart_savePaymentMethod } from '../redux/slices/cartSlice';

const PaymentPage = () => {
    const { shippingAddress } = useSelector(state => state.cart)
    const [paymentMethod, setPaymentMethod] = useState('PayPal')


    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!shippingAddress)
        navigate('/shipping')


    const onChange = (e) => {
        setPaymentMethod(prevValue => e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(cart_savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group name='paymentMethod'>
                    <Form.Label as='legend'>Select Payment Method</Form.Label>
                    <Form.Check>
                        <Form.Check.Label>PayPal</Form.Check.Label>
                        <Form.Check.Input type='radio' label='Paypal' id='PayPal' name='paymentMethod' value='PayPal'
                            checked={paymentMethod === 'PayPal'}
                            onChange={onChange}
                        />
                    </Form.Check>
                    <Form.Check>
                        <Form.Check.Label>Stripe</Form.Check.Label>
                        <Form.Check.Input type='radio' label='Stripe' id='Stripe' name='paymentMethod' value='Stripe'
                            checked={paymentMethod === 'Stripe'}
                            onChange={onChange}
                            disabled />
                    </Form.Check>
                </Form.Group>
                <Button type="submit" variant="primary" className='mt-3'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentPage