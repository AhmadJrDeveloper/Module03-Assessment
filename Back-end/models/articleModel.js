// GoalModel.js
export const createArticlesModel = (sequelize, DataTypes) => {
    const Article = sequelize.define("Articles", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author:{type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.ENUM('article1', 'article2', 'article3'),
            allowNull: false,
        },
        body:{type: DataTypes.STRING,
                allowNull: false
        },
        



            
    }, {
        tableName: 'Articles',
    });
    return Article;
};