import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        }
    )
}

export default generateToken;

// TODO: In postman, set token dynamically:
//          pm.environment.set("TOKEN", pm.response.json().token)