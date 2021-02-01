
const { response } = require("express");
const connection = require("./ControllerDB");
const queries = {};

/**
 * Example:
 */
queries.foo = (request, response) => { 
    let data = request.body.fieldName;
    if (data) {
        const sqlQuery = "show tables;";
        connection.query(sqlQuery, (error,result, fields) => {
            if (error) throw error;
            response.json(result);
        });
    } else {
        response.send("Error: datos incompletos");
    }
    
}

queries.login = (req, res) => {
    const data = {
        username: req.body.username,
        password: req.body.password
    }
    const sql = `select * from username where username = ${data.username} and password = ${data.password}`;
    connection.query(sql, (error, result, fields) => {
        if (error) { 
            // throw error;
            response.status(500); 
            return;
        }
        if (result.length === 0) res.json({ status: false });
        else response.json({ status: true });
    });
}

module.exports = queries;
