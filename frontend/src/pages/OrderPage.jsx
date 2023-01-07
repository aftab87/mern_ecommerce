import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2'
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message';
import { getOrderById } from '../redux/slices/cartSlice';
import Loader from '../components/Loader';
import { pay, payOrderReset } from '../redux/slices/paySlice';

const OrderPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [sdkReady, setSdkReady] = useState(false)

    const {
        order: { user, _id, cartItems, shippingAddress, paymentMethod, shippingPrice, itemsPrice, taxPrice, totalPrice, isPaid, paidAt, isDelivered, deliveredAt },
        loading,
        error
    } = useSelector(state => state.cart)

    const {
        loading: loadingPay,
        success: successPay
    } = useSelector(state => state.pay)

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.crossorigin = "anonymous"
            script.async = true;
            script.onload = () => { setSdkReady(true) }
            document.body.appendChild(script)
        }

        if (!cartItems || successPay) {
            dispatch(payOrderReset())
            dispatch(getOrderById(id))
        } else if (!isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, id, successPay])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(pay(id, paymentResult))
    }

    return (
        <>
            {loading
                ? <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <>
                            <h1>Order {_id}</h1>
                            <Row>
                                <Col md={8}>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <h2>Shipping</h2>
                                            <strong>Name: </strong> {user.name}<br />
                                            <p>
                                                <strong>Address: </strong>
                                                {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                                            </p>
                                            {isPaid && (isDelivered
                                                ? <Message variant='success'>Delivered on: {deliveredAt}</Message>
                                                : <Message variant='danger'>Not Delivered</Message>)
                                            }
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h2>Payment Method</h2>
                                            <p>
                                                <strong>Payment Method: </strong>
                                                {paymentMethod}
                                            </p>
                                            {isPaid
                                                ? <Message variant='success'>Paid on: {paidAt}</Message>
                                                : <Message variant='danger'>Payment pending</Message>
                                            }
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h2>Items</h2>
                                            {cartItems.length === 0
                                                ? <Message>Your cart is empty</Message>
                                                : (
                                                    <ListGroup variant='flush'>
                                                        {cartItems.map((item, index) => {
                                                            return (
                                                                <ListGroup.Item key={index}>
                                                                    <Row>
                                                                        <Col md={1}>
                                                                            <Image src={item.image} alt={item.name} fluid rounded />
                                                                        </Col>
                                                                        <Col>
                                                                            <Link to={`/product/${item.product}`}>
                                                                                {item.name}
                                                                            </Link>
                                                                        </Col>
                                                                        <Col md={4} className='text-end'>
                                                                            {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                                        </Col>
                                                                    </Row>
                                                                </ListGroup.Item>
                                                            )
                                                        })}
                                                    </ListGroup>
                                                )}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col md={4}>
                                    <Card>
                                        <ListGroup>
                                            <ListGroupItem>
                                                <h2>Order Summary</h2>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <Row>
                                                    <Col>Items</Col>
                                                    <Col>${itemsPrice}</Col>
                                                </Row>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <Row>
                                                    <Col>Shipping</Col>
                                                    <Col>${shippingPrice}</Col>
                                                </Row>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <Row>
                                                    <Col>Tax</Col>
                                                    <Col>${taxPrice}</Col>
                                                </Row>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <Row>
                                                    <Col>Total</Col>
                                                    <Col>${totalPrice}</Col>
                                                </Row>
                                            </ListGroupItem>
                                            {!isPaid && (
                                                <ListGroupItem>
                                                    {loadingPay && <Loader />}
                                                    {!sdkReady
                                                        ? <Loader />
                                                        : <PayPalButton
                                                            amount={totalPrice}
                                                            onSuccess={successPaymentHandler} />
                                                    }
                                                </ListGroupItem>
                                            )}
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                        </>
                    )
            }
        </>
    )
}

export default OrderPage