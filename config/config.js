import { Sequelize, DataTypes, UUIDV4 } from 'sequelize';

const sequelize = new Sequelize({
    username: "postgres",
    password: "j24xt200",
    database: "test",
    port: 5432,
    dialect: "postgres",
    logging: false
})
sequelize.authenticate()
    .then(() => console.log('connacted'))
    .catch(e => console.log(e))

export { sequelize, DataTypes, UUIDV4 }