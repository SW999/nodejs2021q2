require('dotenv').config();
const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;

module.exports = {
    'development': {
        'username': DB_USERNAME,
        'password': DB_PASSWORD,
        'database': 'dev_db',
        'host': DB_HOST,
        'dialect': 'postgres'
    },
    'test': {
        'username': DB_USERNAME,
        'password': DB_PASSWORD,
        'database': 'database_test',
        'host': DB_HOST,
        'dialect': 'postgres'
    },
    'production': {
        'username': DB_USERNAME,
        'password': DB_PASSWORD,
        'database': 'database_prod',
        'host': DB_HOST,
        'dialect': 'postgres'
    }
};
// npx sequelize-cli model:generate --name User --attributes login:string,password:string,age:integer,isDeleted:boolean
// npx sequelize-cli model:generate --name Group --attributes name:string,permissions:enum
