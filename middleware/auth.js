import Jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import { AuthorizationError } from "../utils/erros.js";
dotenv.config()
import { User } from '#config/data'

const jwt = async (req, res, next) => {
    try {
        if ('/user/login' === req.url || '/user/signup' === req.url) {
            return next()
        }
        const jwt = Jwt.verify(req.headers.token, process.env.JWT_SECRET)
        const FoundUser = await User.findOne({ where: { id: jwt.id } })
        if (!FoundUser) {
            return next(new AuthorizationError("Invalid token"))
        }
        if (req.headers['user-agent'] !== jwt.agent) {
            return next(new AuthorizationError("This device wrong"))
        }
        req.user_id = jwt.id
        next()
    } catch (error) {
        return next(new AuthorizationError(400, error.message))
    }
}
export default jwt