import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserProfile, updateUserProfile, getMyOrders } from '../redux/slices/userSlice';
import { LinkContainer } from 'react-router-bootstrap';

const UserProfilePage = () => {
    const nameRef = useRef()
    const emailRef = useRef();
    const passwordRef = useRef();
    const password2Ref = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [canShowError, setCanShowError] = useState(true);
    const [message, setMessage] = useState(null);
    let { loading, error, user, success, orders, loadingOrders, errorOrders } = useSelector(state => state.user);


    const onChange = (e) => {
        setCanShowError(false)
    }

    const submitHandler = (e) => {
        setCanShowError(true)
        e.preventDefault();
        const name = nameRef.current && nameRef.current['value'] ? nameRef.current['value'] : ''
        const email = emailRef.current && emailRef.current['value'] ? emailRef.current['value'] : ''
        const password = passwordRef.current && passwordRef.current['value'] ? passwordRef.current['value'] : ''
        const password2 = password2Ref.current && password2Ref.current['value'] ? password2Ref.current['value'] : ''
        if (password !== password2)
            setMessage("Passwords must match!")
        else
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }

    useEffect(() => {
        dispatch(getUserProfile('profile'))
        dispatch(getMyOrders())
    }, [dispatch])

    useEffect(() => {
        if (!user) {
            navigate('/login')
        } else {
            nameRef.current.value = user.name;
            emailRef.current.value = user.email;
        }
    }, [navigate, user])


    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {canShowError && (message || error) && <Message variant='danger'>{message || error}</Message>}
                {success && <Message variant='success'>Profile Updated</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler} noValidate>
                    <Form.Group controlId='name' className='mt-3'>
                        <Form.Label>Full name</Form.Label>
                        <Form.Control type='text' placeholder='John Doe' ref={nameRef} onChange={onChange} />
                    </Form.Group>
                    <Form.Group controlId='email' className='mt-3'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='text' placeholder='user@domain.com' ref={emailRef} onChange={onChange} />
                    </Form.Group>
                    <Form.Group controlId='password' className='mt-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Your Password' ref={passwordRef} onChange={onChange} />
                    </Form.Group>
                    <Form.Group controlId='password2' className='mt-3'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Your Password' ref={password2Ref} onChange={onChange} />
                    </Form.Group>
                    <Button type='submit' variant='primary' className='mt-4'>Update</Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {errorOrders
                    ? <Message variant='danger'>{errorOrders}</Message>
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {loadingOrders
                                    ? <tr><td colSpan={6}><Loader /></td></tr>
                                    : !orders || orders.length === 0
                                        ? <tr><td colSpan={6}><Message variant='danger'>No orders Found</Message></td></tr>
                                        : orders.map(order => (
                                            <tr key={order._id} >
                                                <td>{order._id}</td>
                                                <td>{order.createdAt.substring(0, 10)}</td>
                                                <td>{order.totalPrice}</td>
                                                <td className={order.isPaid ? '' : 'text-center'}>
                                                    {order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }}></i>}
                                                </td>
                                                <td className={order.isDelivered ? '' : 'text-center'}>
                                                    {order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }}></i>}
                                                </td>
                                                <td className='text-center'>
                                                    <LinkContainer to={`/order/${order._id}`}>
                                                        <Button variant='dark'>Details</Button>
                                                    </LinkContainer>
                                                </td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </Table>
                    )
                }
            </Col>
        </Row>
    )
}

export default UserProfilePage