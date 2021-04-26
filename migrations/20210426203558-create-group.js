module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Groups', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            permissions: {
                allowNull: false,
                type: Sequelize.ARRAY(
                    Sequelize.ENUM([
                        'READ',
                        'WRITE',
                        'DELETE',
                        'SHARE',
                        'UPLOAD_FILES'
                    ])
                )
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Groups');
    }
};
