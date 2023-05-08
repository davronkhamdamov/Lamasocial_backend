import { User, Videos, Likes } from '../config/data.js'
import bcryptjs from 'bcryptjs'
import { ValidationError, AuthorizationError, InternalServerError } from '../utils/erros.js'
import { signjwt } from '../utils/jwt.js'

User.sync({ force: false })
Videos.sync({ force: false })

const Signup = async (req, res, next) => {
    try {
        const { username, password, email } = req.body
        if (username.includes('  ')) {
            return next(new ValidationError(400, `There can be not two space this username value`))
        }
        const user = await User.findOne({ where: { email: email } })
        if (user) {
            return next(new AuthorizationError(400, "This email already registered"))
        }
        if (!password.trim().match(/^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)[A-Za-z0-9!#+%]+$/g)) {
            return next(new ValidationError(400, "Password not valid"))
        }
        const hashPassword = await bcryptjs.hash(password, 12)
        await User.create({ username, email, password: hashPassword })
        res.status(201).send({ message: "Successfully registered" })
    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
}
const Login = async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email: email } })
    if (!user) { return next(new AuthorizationError(404, "Email not found")) }
    const check = await bcryptjs.compare(password, user.password)

    if (!check) return next(new AuthorizationError(400, "Password wrong"))

    res.status(200).send({
        message: "Successfully Login",
        token: signjwt(
            {
                id: user.id,
                agent: req.headers['user-agent']
            })
    })
}
const updateUserPhoto = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user_id } })
        await user.update({ imgUrl: req.body.filename })
        res.send({ message: "Successfully updated" })
    } catch (error) {
        return next(new InternalServerError(400, error.message))
    }
}
const updateUserCover = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user_id } })
        await user.update({ imgCoverUrl: req.body.filename })
        res.send({ message: "Successfully updated" })
    } catch (error) {
        return next(new InternalServerError(400, error.message))
    }
}

const getUser = async (req, res) => {
    const user = await User.findOne({
        include: [{
            model: Videos,
            include: [{
                model: Likes
            }]
        }],
        where: { id: req.user_id }
    })
    res.send(user)
}

const getAllUser = async (req, res) => {
    const userData = await User.findAll({
        include: [{
            model: Videos,
            include: [{
                model: Likes
            }]
        }]
    })
    res.send(userData)
}
const checkOnlineUser = async (req, res) => {
    const data = await onlineupdate(req.user_id)
    res.send(data)
}
const onlineupdate = async (id) => {
    const online = await User.findAll()
    online.map(async e => {
        if (e.id === id) {
            await User.update({ isOnline: true }, { where: { id } })
        } else {
            await User.update({ isOnline: false }, { where: { id: e.id } })
        }
    })
    return online
}
setInterval(() => {
    onlineupdate()
}, 10000);

export {
    Signup,
    Login,
    updateUserPhoto,
    getUser,
    getAllUser,
    updateUserCover,
    checkOnlineUser
}