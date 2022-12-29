import React, { useEffect } from 'react'
import { Button, Col, Image, ListGroup, ListGroupItem, Row, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { productDetails } from '../redux/actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductPage = () => {
    const dispatch = useDispatch();
    const { loading, error, product } = useSelector(state => state.productDetails)
    let { id } = useParams();

    useEffect(() => {
        dispatch(productDetails(id))
    }, [dispatch, id]);

    return (
        <>
            <LinkContainer to="/" className={'my-2'}>
                <Button bg='light' variant='light'>
                    Home
                </Button>
            </LinkContainer>
            {loading
                ? <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : <Row>
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
            }
        </>
    )
}

export default ProductPage