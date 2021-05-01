import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    const { ARRAY, ENUM, STRING } = DataTypes;
    class Group extends Model {
        static associate(models) {
            Group.belongsToMany(models.User, {
                through: 'UserGroup',
                timestamps: false
            });
        }
    }

    Group.init({
        name: STRING,
        permissions: ARRAY(ENUM({
            values: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
        }))
    }, {
        sequelize,
        modelName: 'Group',
        timestamps: false
    });

    return Group;
};
