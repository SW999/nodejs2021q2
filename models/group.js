import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Group extends Model {}

    Group.init({
        name: DataTypes.STRING,
        permissions: DataTypes.ARRAY(DataTypes.ENUM({
            values: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
        }))
    }, {
        sequelize,
        modelName: 'Group'
    });
    return Group;
};
