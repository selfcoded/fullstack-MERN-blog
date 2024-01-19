import User from "../modals/User.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "./error/errorHandler.js"
import jwt from 'jsonwebtoken'

export const authAdmin = async (req, res, next) => {
    const { username, password, admin } =  req.body
    const hashedPwd = bcryptjs.hashSync(password,10)
    const adminUser = new User({ username, password: hashedPwd, admin})
    try {
        await adminUser.save()
        res.status(201).json('user created successfully!')
    } catch( err ){
        next(err)
    }
}

export const authAdminLogin = async (req, res, next) => {
    const { username, password } = req.body
    try {
        const validAdmin = await User.findOne({ username })
        if (!validAdmin) return next(errorHandler(404, 'username not found!'))
        const validPassword = await User.findOne({ password })
        if(!validPassword) return next(errorHandler(404, 'credential is false!'))
        const token = jwt.sign({ id: validAdmin._id }, process.env.JWT_TOKEN)
        const { password: pass, ...rest } = validAdmin._doc
        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest)
    } catch(err) {
        next(err)
    }
}