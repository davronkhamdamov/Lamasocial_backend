import { Likes, user_message } from '../config/data.js'
import { InternalServerError } from '../utils/erros.js'

Likes.sync({ force: false })

const updateLike = async (req, res, next) => {
    try {
        const likes = await Likes.findOne(
            {
                where: {
                    userId: req.user_id,
                    video_id: req.body.video_id
                }
            })
        if (!likes) {
            const newLikes = await Likes.create({
                userId: req.user_id,
                video_id: req.body.video_id
            }, { returning: true })
            await user_message.create({
                userId: req.user_id,
                video_id: req.body.video_id
            })
            res.send({
                message: "Successfully liked",
                likes: [newLikes]
            })
        } else {
            await likes.update({ isLike: !likes.isLike })
            res.send({
                message: "Like successfully updated",
                likes: await Likes.findAll({ where: { video_id: likes.video_id } })
            })
        }
    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
}
const getAllLikes = async (req, res) => {
    const likesData = await Likes.findAll()
    res.send(likesData)
}
export { updateLike, getAllLikes }