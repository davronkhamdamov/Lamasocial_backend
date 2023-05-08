import { Router } from 'express'
import { Signup, Login, updateUserPhoto, getUser, getAllUser, updateUserCover, checkOnlineUser } from '../controller/user.js'
const rout = Router()

rout.post('/signup', Signup)
rout.get('/user', getUser)
rout.get('/users', getAllUser)
rout.post('/login', Login)
rout.post('/photo', updateUserPhoto)
rout.post('/cover', updateUserCover)
rout.post('/online', checkOnlineUser)

export default rout