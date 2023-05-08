import { Sequelize, DataTypes, UUIDV4 } from 'sequelize';
import dotenv from "dotenv";
dotenv.config()

const sequelize = new Sequelize(process.env.ELEPHANTSQLURL, { logging: false })
sequelize.authenticate()
    .then(() => console.log('connacted'))
    .catch(e => console.log(e))

export { sequelize, DataTypes, UUIDV4 }