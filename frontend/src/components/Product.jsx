import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
    return (
        <Card className='h-100 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </Link>

            <Card.Body className='d-inline-flex flex-column align-items-stretch'>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div' className='pb-2'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as='div' className='mt-auto'>
                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`} />
                </Card.Text>

                <Card.Text as='h3'>
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product