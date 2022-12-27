import React from 'react'
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import products from '../test/products';

const HomePage = () => {
    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product.name.trim().replace(" ", "_")} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomePage