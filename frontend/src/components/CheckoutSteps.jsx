import React from 'react'
import { Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    const { user } = useSelector(state => state.user);

    return (
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
                {step1 && !user ? (
                    <LinkContainer to="/login">
                        <Nav.Link>
                            Sign In
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>
                        Sign In
                    </Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {user ? (
                    <LinkContainer to="/shipping">
                        <Nav.Link>
                            Shipping
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>
                        Shipping
                    </Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {localStorage.getItem('shippingAddress') ? (
                    <LinkContainer to="/payment">
                        <Nav.Link>
                            Payment
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>
                        Payment
                    </Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {localStorage.getItem('paymentMethod') ? (
                    <LinkContainer to="/placeorder">
                        <Nav.Link>
                            Place Order
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>
                        Place Order
                    </Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps