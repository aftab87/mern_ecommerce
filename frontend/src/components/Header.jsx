import React from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar } from 'react-bootstrap'

const Header = () => {
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
                                <Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                <Nav.Link><i className='fas fa-user'></i>Login</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header