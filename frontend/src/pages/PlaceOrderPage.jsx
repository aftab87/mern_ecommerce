import React, { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message';
import { createOrder } from '../redux/slices/cartSlice';

const PlaceOrderPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems, shippingAddress, paymentMethod, order, success, error } = useSelector(state => state.cart)

    const itemsPrice = cartItems.reduce((accumulator, curItem) => accumulator + Number((curItem.qty * curItem.price).toFixed(2)), 0)

    let shippingPrice = itemsPrice > 100 ? 0 : 10;
    let taxPrice = itemsPrice * 0.15025
    let totalPrice = itemsPrice + shippingPrice + taxPrice

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`)
        }
    }, [dispatch, navigate, order, success])


    const placeOrderHandler = () => {
        dispatch(createOrder({
            cartItems,
            shippingAddress,
            paymentMethod,
            itemsPrice: Math.round(itemsPrice * 100) / 100,
            shippingPrice: Math.round(shippingPrice * 100) / 100,
            taxPrice: Math.round(taxPrice * 100) / 100,
            totalPrice: Math.round(totalPrice * 100) / 100
        }))
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Payment Method: </strong>
                                {paymentMethod}
                            </p>
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
                                    <Col>${itemsPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${shippingPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${taxPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${totalPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroupItem>
                            {error && (
                                <ListGroupItem>
                                    <Message variant='danger'>{error}</Message>
                                </ListGroupItem>
                            )}
                            <ListGroupItem className='text-center'>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                >Continue to payment</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderPage