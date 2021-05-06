const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const { database, username, password } = config;

export {
  config,
  database,
  password,
  username
};
