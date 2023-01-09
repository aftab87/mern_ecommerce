import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { Button, Col, Row, Table } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { getProductsList, deleteProduct, deleteProductReset } from "../../redux/slices/productListSlice"

const ProductsPage = () => {
    const dispatch = useDispatch()

    const { user } = useSelector(
        state => state.user
    )

    const { loading, error, products, errorDelete } = useSelector(
        state => state.productList
    )

    useEffect(() => {
        if (user && user.isAdmin)
            dispatch(getProductsList())
        return () => {
            dispatch(deleteProductReset())
        }
    }, [dispatch, user])

    function deleteHandler(id) {
        if (window.confirm('Are you sure?'))
            dispatch(deleteProduct(id))
    }

    function createProductHandler() {

    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-end">
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fas fa-plus"></i> Create Product
                    </Button>
                </Col>
            </Row>
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {!products || loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>
                                    {product.price}
                                </td>
                                <td>
                                    {product.category}
                                </td>
                                <td>
                                    {product.brand}
                                </td>
                                <td>
                                    <LinkContainer
                                        to={`/admin/products/${product._id}/edit`}
                                    >
                                        <Button
                                            variant='light'
                                            className='btn-sm'
                                        >
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteHandler(product._id)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default ProductsPage
