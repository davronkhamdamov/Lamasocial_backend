import { DataTypes, UUIDV4, sequelize } from "./config.js"

const User = sequelize.define('users', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[a-zA-Z\-]+$/
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "assets/person/1.png"
    },
    imgCoverUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "assets/post/1.jpg"
    },
    isOnline: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})
const Videos = sequelize.define('videos', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    videoUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
const User_Friend = sequelize.define('user_friend', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sbsUserId: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
const Likes = sequelize.define('likes', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    video_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isLike: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})
const user_message = sequelize.define('user_message', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    video_img: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

User.hasMany(Videos, {
    foreignKey: "userId"
})

User.hasMany(Likes, {
    foreignKey: "userId"
})

Videos.hasMany(Likes, {
    foreignKey: "video_id"
})

Videos.hasMany(user_message, {
    foreignKey: "video_id"
})

User.hasMany(user_message, {
    foreignKey: "userId"
})

export {
    User,
    Videos,
    User_Friend,
    user_message,
    Likes
}