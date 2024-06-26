const mysql = require('mysql2');
require("dotenv").config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
})

connection.connect((error) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Connected to the database');
      
    }
  });

  module.exports = { connection }