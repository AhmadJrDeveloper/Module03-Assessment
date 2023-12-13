// ../Models/index.js
import { dbConfig } from "../config/dbConfig.js";
import { Sequelize, DataTypes } from "sequelize";
import { createArticlesModel } from "./articleModel.js";
import { createUsersModel } from "./userModel.js";

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);


sequelize.authenticate()
    .then(() => {
        console.log("connected to the database");
    })
    .catch(error => {
        console.error("error connecting: " + error);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.Roles = createRoleModel(sequelize, DataTypes);
db.Articles = createArticlesModel(sequelize, DataTypes);
db.Users = createUsersModel(sequelize, DataTypes);

// db.Roles.hasMany(db.Users, {
//     foreignKey: "role_id",
//     as: "user"
// });

// db.Users.belongsTo(db.Roles, {
//     foreignKey: "role_id",
//     as: "role"
// });

// db.Categories.hasMany(db.Transactions, {
//     foreignKey: "category_id",
//     as: "transaction"
// });

// db.Transactions.belongsTo(db.Categories, {
//     foreignKey: "category_id",
//     as: "category"
// });

// db.Users.hasMany(db.Transactions, {
//     foreignKey: "user_id",
//     as: "transaction"
// });

// db.Transactions.belongsTo(db.Users, {
//     foreignKey: "user_id",
//     as: "user"
// });




db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Database synchronization done!");
    });

export { db,};