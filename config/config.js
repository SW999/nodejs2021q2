import dotenv from 'dotenv';
dotenv.config();
const { DB_HOST, DB_USERNAME, DB_PASSWORD, TOKEN_SECRET } = process.env;

module.exports = {
  'development': {
    'username': DB_USERNAME,
    'password': DB_PASSWORD,
    'database': 'postgres_dev',
    'host': DB_HOST,
    'dialect': 'postgres',
    'secret': TOKEN_SECRET
  },
  'test': {
    'username': DB_USERNAME,
    'password': DB_PASSWORD,
    'database': 'database_test',
    'host': DB_HOST,
    'dialect': 'postgres',
    'secret': TOKEN_SECRET
  },
  'production': {
    'username': DB_USERNAME,
    'password': DB_PASSWORD,
    'database': 'database_prod',
    'host': DB_HOST,
    'dialect': 'postgres',
    'secret': TOKEN_SECRET
  }
};

// npx sequelize-cli model:generate --name User --attributes login:string,password:string,age:integer,isDeleted:boolean
// npx sequelize-cli model:generate --name Group --attributes name:string,permissions:enum
