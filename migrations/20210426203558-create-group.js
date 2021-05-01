module.exports = {
    up: async (queryInterface, Sequelize) => {
        const { INTEGER, STRING, ARRAY, ENUM } = Sequelize;
        await queryInterface.createTable('Groups', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: INTEGER
            },
            name: {
                type: STRING
            },
            permissions: {
                allowNull: false,
                type: ARRAY(
                    ENUM([
                        'READ',
                        'WRITE',
                        'DELETE',
                        'SHARE',
                        'UPLOAD_FILES'
                    ])
                )
            }
        });
    },
    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Groups');
    }
};
