import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    const { STRING, INTEGER, BOOLEAN } = DataTypes;
    class User extends Model {
        static associate(models) {
            User.belongsToMany(models.Group, {
                through: 'UserGroup',
                timestamps: false
            });
        }
    }

    User.init({
        login: STRING,
        password: STRING,
        age: INTEGER,
        isDeleted: BOOLEAN
    }, {
        sequelize,
        modelName: 'User',
        timestamps: false
    });

    return User;
};
