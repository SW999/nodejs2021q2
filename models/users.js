const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    Users.init({
        login: DataTypes.I,
        password: DataTypes.STRING,
        age: DataTypes.INTAGER,
        isDeleted: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Users'
    });
    return Users;
};
