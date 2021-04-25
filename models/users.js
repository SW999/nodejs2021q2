const {
    Model
} = require('sequelize');
// import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        // eslint-disable-next-line no-unused-vars
        static associate(models) {
            // define association here
        }
    }
    Users.init({
        login: DataTypes.STRING,
        password: DataTypes.STRING,
        age: DataTypes.INTEGER,
        isDeleted: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Users'
    });
    return Users;
};
