import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class User extends Model {}

    User.init({
        login: DataTypes.STRING,
        password: DataTypes.STRING,
        age: DataTypes.INTEGER,
        isDeleted: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'User'
    });
    return User;
};
