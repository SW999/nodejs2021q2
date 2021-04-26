module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'Groups',
            [
                {
                    name: 'admin',
                    permissions: Sequelize.literal(`ARRAY['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']::"enum_Groups_permissions"[]`),
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'user',
                    permissions: Sequelize.literal(`ARRAY['READ', 'SHARE']::"enum_Groups_permissions"[]`),
                    createdAt: new Date(),
                    updatedAt: new Date()
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
