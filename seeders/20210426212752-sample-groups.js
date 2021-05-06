module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Groups',
      [
        {
          name: 'admin',
          // eslint-disable-next-line
                    permissions: Sequelize.literal(`ARRAY['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']::"enum_Groups_permissions"[]`)
        },
        {
          name: 'user',
          // eslint-disable-next-line
                    permissions: Sequelize.literal(`ARRAY['READ', 'SHARE']::"enum_Groups_permissions"[]`)
        }
      ],
      {}
    );
  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Groups', null, {});
  }
};
