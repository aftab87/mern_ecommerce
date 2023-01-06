import React from 'react'
import PropTypes from 'prop-types'

const Rating = ({ value, text, color }) => {
    const getStars = () => {
        const stars = []
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={'star' + i}>
                    <i
                        style={{ color: color ? color : "#c8c805" }}
                        className={
                            value >= i
                                ? 'fas fa-star'
                                : value >= i - 0.5
                                    ? 'fas fa-star-half-alt'
                                    : 'far fa-star'
                        }></i>
                </span>
            )
        }
        return stars
    }

    return (
        <div className='rating'>
            {getStars()}
            {text && <span className='ms-1'>{text}</span>}
        </div>
    )
}

// Rating.propTypes = {
//     value: PropTypes.number.isRequired,
//     text: PropTypes.string.isRequired,
//     color: PropTypes.string
// }

export default Rating