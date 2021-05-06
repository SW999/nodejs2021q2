import { Model } from 'sequelize';
import { GROUP_PERMISSIONS } from '../constants';

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
      values: Object.values(GROUP_PERMISSIONS)
    }))
  }, {
    sequelize,
    modelName: 'Group',
    timestamps: false
  });

  return Group;
};
