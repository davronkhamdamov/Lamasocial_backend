import pkg1 from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const signjwt = (props) => {
    return pkg1.sign(props, process.env.JWT_SECRET, {
        expiresIn: '5h'
    })
}
const verifyjwt = token => {
    try {
        return pkg1.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return error
    }
}

export {
    signjwt,
    verifyjwt,
}