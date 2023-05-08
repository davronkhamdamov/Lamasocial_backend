import { Router } from 'express'
import { updateLike, getAllLikes } from '../controller/likes.js'
const rout = Router()

rout.get('/likes', getAllLikes)
rout.post('/like', updateLike)

export default rout