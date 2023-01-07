import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = ({width='64px', height='64px'}) => {
    return (
        <Spinner animation='border' role='status' style={{ width: width, height: height, margin: 'auto', display: 'block' }}>
            <span className='sr-only'>Loading...</span>
        </Spinner>
    )
}

export default Loader