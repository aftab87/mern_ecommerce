import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Product from '../components/Product';
import Message from '../components/Message';
import { getProductsList } from '../redux/slices/productListSlice';

const HomePage = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.productList)

    useEffect(() => {
        dispatch(getProductsList())
    }, [dispatch]);

    return (
        <>
            <h1>Latest Products</h1>
            {loading
                ? <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : <Row>
                        {products.map(product => (
                            <Col key={product.name.trim().replace(" ", "_")} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
            }
        </>
    )
}

export default HomePage