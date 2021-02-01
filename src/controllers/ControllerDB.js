
require("dotenv").config();
const mysql = require("mysql");

// const pool  = mysql.createPool({
//     host: process.env.MYSQL_DB_HOST,
//     user: process.env.MYSQL_DB_USER,
//     password: process.env.MYSQL_DB_PASSW,
//     database: process.env.DATABASE_NAME
// });

// pool.getConnection(function (error, connection) {
//     if (error) {
//         switch (error) {
//             case "PROTOCOL_CONNECTION_LOST":
//                 console.error("Database connection was closed");
//                 break;
//             case "ER_CON_COUNT_ERROR":  
//                 console.error("Database has to many connections!");
//                 break;
//             case "ECONNREFUSED":
//                 console.error("Database connection was refused");
//                 break;
//             default:
//                 console.error("Database connection error");
//                 break;
//         }
//     }
//     if (connection) connection.release();
//     console.log("MySQL Database Connected");
//     return;
// });

// module.exports = pool;

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
