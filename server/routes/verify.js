import jwt from 'jsonwebtoken'
import { errorHandler } from '../controllers/error/errorHandler.js'

const verifyToken = (req, res, next) => {
    console.log(req.cookies);
    const token = req.cookies.access_token
    if(!token) next(errorHandler(401, 'you not allowed to modify data!'))
    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
        if(err) next(errorHandler(403, 'forbidden!!'))
        res.user = user
    })
    next()

}

export default verifyToken