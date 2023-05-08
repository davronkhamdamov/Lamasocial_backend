import { Router } from 'express'
import { getMessages } from '../controller/message.js'
const rout = Router()

rout.get('/list', getMessages)


export default rout