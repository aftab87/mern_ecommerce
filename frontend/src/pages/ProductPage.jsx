import React from 'react';
import { Button, Col, Image, ListGroup, ListGroupItem, Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import products from '../test/products';
import { LinkContainer } from 'react-router-bootstrap';
import Rating from '../components/Rating';

const ProductPage = () => {
    let { id } = useParams();
    const product = products.find(p => p._id === id)
    // product.countInStock = 0;

    return (
        <>
            <LinkContainer to="/">
                <Button bg='light' variant='light'>
                    Home
                </Button>
            </LinkContainer>
            <Row>
                <Col lg={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col lg={3}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h3>{product.name}</h3>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroupItem>
                        <ListGroupItem>
                            Description: {product.description}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col lg={3}>
                    <Card>
                        <ListGroup>
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <strong>{product.countInStock > 0 ? product.countInStock + ' remaining' : 'Out of Stock'}</strong>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button className='btn-block w-100' type='button' disabled={product.countInStock === 0}>Add to Cart</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductPage