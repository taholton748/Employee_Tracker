const { prompt } = require('inquirer');
const mysql = require('mysql2');
require
// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'inventory_db'
    },
    console.log(`Connected to the inventory_db database.`)
  ).promise();

  const mainMenu = async () => {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View All Employees',
                    value: 'VIEW_EMPLOYEES'
                },
                {
                    name: 'View All Departments',
                    value: 'VIEW_DEPARTMENTS'
                },

            ]
        }
    ])

    switch (choice) {
        case 'VIEW_EMPLOYEES':
            // do something
            viewEmployees();
            break;
        case 'VIEW_DEPARTMENTS':
            // do something
            viewDepartments();
            break;
            case 'EXIT':
                process.exit();
                break;
        default:
            process.exit
    }
  };

const viewEmployees = async () => {
    const employeeData = await db.query("SELECT * FROM employee");
    console.table(employeeData);
    mainMenu();
  };
const viewDepartments = () => {

  };

  mainMenu ();