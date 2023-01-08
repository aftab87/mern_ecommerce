import React, { useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { getProfile, updateProfile, updateProfileReset } from '../../redux/slices/userSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UsersEditPage = () => {
    const { id } = useParams();
    const nameRef = useRef();
    const emailRef = useRef();
    const isAdminRef = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [canShowError, setCanShowError] = useState(true);
    let { profile, loadingProfile, errorProfile, loadingProfileUpdate, successProfileUpdate, errorProfileUpdate } = useSelector(state => state.user);

    useEffect(() => {
        if (successProfileUpdate) {
            dispatch(updateProfileReset())
            navigate('/admin/users')
        } else {
            if (!loadingProfile && (!profile.name || profile._id !== id)) {
                dispatch(getProfile(id))
            } else if (profile && JSON.stringify(profile) !== '{}') {
                nameRef.current.value = profile.name
                emailRef.current.value = profile.email
                isAdminRef.current.checked = profile.isAdmin
            }
        }

    }, [dispatch, id, loadingProfile, navigate, profile, successProfileUpdate])

    const onChange = (e) => {
        setCanShowError(false)
    }

    const submitHandler = (e) => {
        setCanShowError(true)
        e.preventDefault();
        const name = nameRef.current && nameRef.current['value'] ? nameRef.current['value'] : ''
        const email = emailRef.current && emailRef.current['value'] ? emailRef.current['value'] : ''
        const isAdmin = isAdminRef.current && isAdminRef.current.checked

        dispatch(updateProfile({ _id: id, name, email, isAdmin }))
    }

    return (
        <>
            <Link to='/admin/users' className='btn my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit user</h1>
                {canShowError && errorProfile && <Message variant='danger'>{errorProfile}</Message>}
                {loadingProfileUpdate && <Loader />}
                {errorProfileUpdate && <Message variant='danger'>{errorProfileUpdate}</Message>}
                {loadingProfile
                    ? <Loader />
                    : (
                        <Form onSubmit={submitHandler} noValidate>
                            <Form.Group controlId='name' className='mt-3'>
                                <Form.Label>Full name</Form.Label>
                                <Form.Control type='text' placeholder='John Doe' ref={nameRef} onChange={onChange} />
                            </Form.Group>
                            <Form.Group controlId='email' className='mt-3'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type='text' placeholder='user@domain.com' ref={emailRef} onChange={onChange} />
                            </Form.Group>
                            <Form.Group controlId='Admin' className='mt-3'>
                                <Form.Check type='checkbox' label='Admin?' ref={isAdminRef} />
                            </Form.Group>
                            <Button type='submit' variant='primary' className='mt-4'>Update</Button>
                        </Form>
                    )
                }
            </FormContainer>
        </>
    )
}

export default UsersEditPage