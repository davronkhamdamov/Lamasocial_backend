import { user_message } from '../config/data.js'

const getMessages = async (req, res) => {
    const UserMessage = await user_message.findAll(
        { where: { userID: req.user_id } })
    res.send(UserMessage)
}

export { getMessages }