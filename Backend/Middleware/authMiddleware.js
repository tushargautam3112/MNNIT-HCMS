import jwt from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = expressAsyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findOne({email:decoded.email}).select('-password')

            next()
        } catch (err) {
            res.status(401)
            throw new Error('Not Authorized,no token')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not Authorized')
    }

})

const admin = (req, res, next) => {
    if (req.user && req.user.userRole === 'admin' || req.user && req.user.userRole === 'supervisor') {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

export { protect, admin }