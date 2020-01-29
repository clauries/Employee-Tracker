const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
//const app = require(./app.js);

const connection = mysql.createConnection({
    host: "localhost", // or 127.0.0.1
    port: 3306,
    user: "root",
    password: "si11y#b0y",
    database: "employee_tracker_db"
});

connection.connect(err => {
    if (err) throw err;
    console.log("You are connected to mysql " + connection.threadId);
    askQuestions();
});

function askQuestions() {
    inquirer
        .prompt([
            {
                type: "rawlist",
                name: "choices",
                message: "What would you like to do today?",
                choices: [
                    "View departments",
                    "Add a department",
                    "View roles",
                    "Add a role",
                    "View employees",
                    "Add an employee",
                    "Update an employee's role",
                    "Quit"
                    //"View employees by manager"
                    //"Update an employee"
                    //"Delete information" See the Slack class activities
                    //"View utilized budget for a deptartment"
                ]
            }
        ])
        .then(function (answer) {
            switch (answer.choices) {
                case "View departments":
                    viewDepts()
                    break;
                case "Add a department":
                    addDepts();
                    break;
                case "View roles":
                    viewRoles();
                    break;
                case "Add a role":
                    addRoles();
                    break;
                case "View employees":
                    viewEmployees();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Update an employee's role":
                    updateRole();
                    break;
                case "Quit":
                    quit();
                    break;
                default:
                // code block
            }
        });
};

// Loop through object with ID?
// Console.table?
// Clean up
function viewDepts() {
    console.log("The departments are: ");
    connection.query("SELECT * FROM DEPARTMENT", function (err, result) {
        if (err) throw err;
        console.table(result);
        goToQuestions();
    });
}


function addDepts() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "department",
                message: "What department do you want to add?"
            }
        ]).then(answers => {
            // Use user feedback for... whatever!!
            const sqlQuery = `INSERT INTO DEPARTMENT (NAME) VALUES ('${answers.department}')`;
            connection.query(sqlQuery, function (err, result, fields) {
                if (err) throw err;
                console.log(`Department ${answers.department} added`);
                goToQuestions();
            });
        });
};

function viewRoles() {
    console.log("The roles are: ");
    connection.query("SELECT ID, TITLE FROM ROLES", function (err, result) {
        if (err) throw err;
        console.table(result);
        goToQuestions();
    });
};

function addRoles() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "role",
            message: "What role do you want to add?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary for this role?"
        },
        {
            type: "input",
            name: "dept",
            message: "What is the department ID for this role?"
        }
    ]).then(answers => {
        // Use user feedback for... whatever!!
        const sqlQuery = `INSERT INTO Roles (TITLE, SALARY, DEPT_ID) VALUES ('${answers.role}', '${answers.salary}', '${answers.dept}')`;
        connection.query(sqlQuery, function (err, result, fields) {
            if (err) throw err;
            console.log(`Role ${answers.role} added`);
            console.log (`Salary of ${answers.salary} added`);
            console.log(`Role in department ID: ${answers.dept}`);
            goToQuestions();
        });
    });
};

// mAYBE USE MULTIPLE VARIABLES FOR THE QUERIES
// const query1 = "SELECT .... FROM EMPLOYEES"
// const query2 = "SELECT .... FROM DEPARTMENTS"
// connection.query (query1, query2) & then somehow joing them?
function viewEmployees() {
    console.log("The employees are: ");
    connection.query("SELECT * FROM EMPLOYEES", function (err, result) {
        if (err) throw err;
        console.table(result);
        goToQuestions();
    });
};

function addEmployee() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?"
        },
        {
            type: "input",
            name: "roleID",
            message: "What is the role ID for this employee?"
        },
        {
            type: "input",
            name: "managerID",
            message: "What is the manager ID for this employee?"
        }
    ]).then(answers => {
        // Use user feedback for... whatever!!
        const sqlQuery = `INSERT INTO EMPLOYEES (FIRST_NAME, LAST_NAME, ROLE_ID, MANAGER_ID) VALUES ('${answers.firstName}', '${answers.lastName}', '${answers.roleID}', '${answers.managerID}')`;
        connection.query(sqlQuery, function (err, result, fields) {
            if (err) throw err;
            console.log(`Employee ${answers.firstName} ${answers.lastName} added`);
            console.log (`Role ID of ${answers.roleID} added`);
            console.log(`Manager ID of ${answers.managerID} added`);
            goToQuestions();
        });
    });
};

// IS THERE A WAY TO CREATE A LIST OF OPTIONS IN THE DB?
// SO LIKE LISTING OFF THE CURRENT EMPLOYEES FOR THE USER?
function updateRole() {
    console.log("Choose employee to update role");
    inquirer
    .prompt([
        {
            type: "input",
            name: "employeeID",
            message: "What is the employee's ID?"
        },
        {
            type: "input",
            name: "roleID",
            message: "What is the employee's new role ID?"
        }
    ]).then(answers => {
        const sqlQuery = `UPDATE EMPLOYEES SET ROLE_ID = ${answers.roleID} WHERE ID = ${answers.employeeID}`;
        connection.query(sqlQuery, function (err, result, fields) {
            if (err) throw err;
            console.log(`Employee # ${answers.employeeID} updated`);
            console.log (`Role ID now ${answers.roleID}`);
            goToQuestions();
        });
    });
    
};

function quit() {
    console.log("quitting");
    connection.end();
    process.exit();
}

function goToQuestions() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "choices",
                message: "Return to menu or quit?",
                choices: [
                    "Return to menu",
                    "Quit"
                ]
            }
        ]).then(function (answers) {
                switch (answers.choices) {
                    case "Return to menu":
                        askQuestions();
                        break;
                    case "Quit":
                        quit();
                        break;
                    default:
                        console.log("Not a valid option")
                }
            });

        
}