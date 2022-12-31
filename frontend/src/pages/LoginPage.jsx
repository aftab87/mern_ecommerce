import React, { useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { login } from '../redux/slices/userSlice';

const LoginPage = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect');

    const [canShowError, setCanShowError] = useState(true);
    const { loading, error, user } = useSelector(state => state.user);


    const onChange = (e) => {
        setCanShowError(false)
    }

    const submitHandler = (e) => {
        setCanShowError(true)
        e.preventDefault();
        //TODO: 
        const email = emailRef.current && emailRef.current['value'] ? emailRef.current['value'] : ''
        const password = passwordRef.current && passwordRef.current['value'] ? passwordRef.current['value'] : ''
        dispatch(login(email, password))
    }

    useEffect(() => {
        if (user) {
            navigate(redirect || '/')
        }
    }, [navigate, redirect, user])


    return (
        <FormContainer>
            <h1>Log In</h1>
            {canShowError && error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} noValidate>
                <Form.Group controlId='emailz' className='mt-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='text' placeholder='user@domain.com' ref={emailRef} onChange={onChange} />
                </Form.Group>
                <Form.Group controlId='password' className='mt-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Your Password' ref={passwordRef} onChange={onChange} />
                </Form.Group>
                <Button type='submit' variant='primary' className='mt-4'>Log In</Button>
            </Form>
            <p className='mt-2'>New customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link></p>
        </FormContainer>
    )
}

export default LoginPage