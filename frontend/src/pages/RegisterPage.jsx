import React, { useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { register } from '../redux/slices/userSlice';

const RegisterPage = () => {
    const nameRef = useRef()
    const emailRef = useRef();
    const passwordRef = useRef();
    const password2Ref = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect');

    const [canShowError, setCanShowError] = useState(true);
    const [message, setMessage] = useState(null);
    let { loading, error, user } = useSelector(state => state.user);


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
            dispatch(register(name, email, password))
    }

    useEffect(() => {
        if (user) {
            navigate(redirect || '/')
        }
    }, [navigate, redirect, user])


    return (
        <FormContainer>
            <h1>Register</h1>
            {canShowError && (message || error) && <Message variant='danger'>{message || error}</Message>}
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
                <Button type='submit' variant='primary' className='mt-4'>Register</Button>
            </Form>
            <p className='mt-2'>Already have an account? <Link to={redirect ? `/register?redirect=${redirect}` : '/login'}>Log In</Link></p>
        </FormContainer>
    )
}

export default RegisterPage