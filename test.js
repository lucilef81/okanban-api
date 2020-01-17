const dotenv = require('dotenv');
dotenv.config();

const db = require('./app/db');

db.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});