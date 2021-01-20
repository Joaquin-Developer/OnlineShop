
require("dotenv").config();
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: process.env.MYSQL_DB_HOST,
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSW,
    database: process.env.DATABASE_NAME
});

connection.connect(function(error) {
    if (error) throw error;
    console.log("MySQL Database connected!");
});

module.exports =  connection;
