import { Likes, User, user_message, Videos } from '../config/data.js'
import { InternalServerError } from '../utils/erros.js'

user_message.sync({ force: false })
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
            const user_id = await Videos.findOne({ where: { id: req.body.video_id } })
            const user = await User.findOne({ where: { id: req.user_id } })
            if (user_id !== req.user_id) {
                await user_message.create({
                    title: `${user.username} sizga like bosdi`,
                    userId: user_id.userId,
                    imgUrl: user.imgUrl,
                    video_img: user_id.videoUrl
                })
            }
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