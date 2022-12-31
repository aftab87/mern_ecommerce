import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Col, Image, ListGroup, ListGroupItem, Row, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getProduct } from '../redux/slices/productSlice';

const ProductPage = ({ history }) => {
    const [qty, setQty] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, product } = useSelector(state => state.productDetails)
    let { id } = useParams();

    useEffect(() => {
        dispatch(getProduct(id))
    }, [dispatch, id]);

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }

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
                    : product &&
                    (<Row>
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
                                    {product.countInStock > 0 && (
                                        <ListGroupItem>
                                            <Row>
                                                <Col>Quantity</Col>
                                                <Col>
                                                    <Form.Control as='select' value={qty} onChange={e => setQty(e.target.value)}>
                                                        {[...Array(product.countInStock).keys()].map(x => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    )}
                                    <ListGroupItem>
                                        <Button
                                            onClick={addToCartHandler}
                                            className='btn-block w-100'
                                            type='button'
                                            disabled={product.countInStock === 0}>
                                            Add to Cart
                                        </Button>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>)
            }
        </>
    )
}

export default ProductPage