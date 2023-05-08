import { Videos } from '../config/data.js'

Videos.sync({ force: false })

const VideoUpload = async (req, res, next) => {
    await Videos.create(
        {
            title: req.body.title,
            videoUrl: req.body.filename,
            userId: req.user_id
        }
    )
    res.status(201).send({
        message: "Video successfully added"
    })
}
const getAllVideo = async (req, res) => {
    const videos = await Videos.findAll({})
    res.status(200).send(videos)
}

export { VideoUpload, getAllVideo }