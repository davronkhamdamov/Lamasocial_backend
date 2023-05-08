import { user_message, User, Videos } from '../config/data.js'

Videos.sync({ force: false })
user_message.sync({ force: false })

const getMessages = async (req, res) => {
    const UserMessage = await user_message.findAll({
        where: { userId: req.user_id }
    })
    res.send(UserMessage)
}

export { getMessages }