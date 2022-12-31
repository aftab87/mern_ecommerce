import React from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/userSlice';

const Header = () => {
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.user)

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="primary" variant='dark' expand="lg" collapseOnSelect>
                <Container fluid>
                    <LinkContainer to="/">
                        <Navbar.Brand >A-Shop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="ms-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <LinkContainer to="/cart">
                                <Nav.Link><i className='fas fa-shopping-cart mx-1'></i>Cart</Nav.Link>
                            </LinkContainer>
                            {user
                                ? (
                                    <NavDropdown title={user.name} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>
                                            Log Out
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                )
                                : (
                                    <LinkContainer to="/login">
                                        <Nav.Link><i className='fas fa-user mx-1'></i>Log In</Nav.Link>
                                    </LinkContainer>
                                )
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header