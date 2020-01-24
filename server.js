const mysql = require("mysql");


const connection = mysql.createConnection( {
    host: "localhost", // or 127.0.0.1
    port: 3306,
    user: "root",
    password: "si11y#b0y",
    database: "employee_tracker_db"
});

connection.connect( err => {
    if (err) throw err;
    console.log("You are connected to mysql " + connection.threadId);
    readEmployees();
});

function readEmployees() {
    console.log("Employees")
}