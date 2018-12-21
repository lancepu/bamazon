const mysql = require("mysql");
require("dotenv").config();

module.exports = {
    //connect to DB
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: "bamazon"
    }),

    connect(err) {
        if (err) {
            console.error("error connecting: " + err.stack);
            return;
        }
    }
}
