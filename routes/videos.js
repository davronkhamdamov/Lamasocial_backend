import { Router } from 'express'
import { VideoUpload, getAllVideo } from '../controller/video.js'
const rout = Router()

rout.post('/upload', VideoUpload)
rout.get('/list', getAllVideo)

export default rout