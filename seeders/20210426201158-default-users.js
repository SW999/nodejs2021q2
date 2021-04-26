module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'Users',
            [
                {
                    login: 'John',
                    password: 'test1',
                    age: 25,
                    isDeleted: false,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    login: 'John Nash',
                    password: 'test2',
                    age: 60,
                    isDeleted: false,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    login: 'John Doe',
                    password: 'test3',
                    age: 40,
                    isDeleted: false,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },
    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
