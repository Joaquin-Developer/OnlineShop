
const connection = require("./DBController");
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

module.exports = queries;
