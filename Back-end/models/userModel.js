// GoalModel.js
export const createUsersModel = (sequelize, DataTypes) => {
    const User = sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('user', 'admin'),
            allowNull: false,
        },
    }, {
        tableName: 'Users',
    });
    return User;
};