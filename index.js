const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
// import inquirer from "inquirer";
// import mysql from "mysql2";
// import cTable from "console.table";

// Connect to database
const db = mysql
  .createConnection(
    {
      host: "localhost",
      // MySQL username,
      user: "root",
      // MySQL password
      password: "",
      database: "employees",
    },
    console.log(`Connected to the employees database.`)
  )
  .promise();

const mainMenu = async () => {
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "Add A Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Add A Role",
          value: "ADD_ROLE",
        },
        {
          name: "Add An Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_ROLE",
        },
      ],
    },
  ]);

  switch (choice) {
    case "VIEW_DEPARTMENTS":
      // do something
      viewDepartments();
      break;
    case "VIEW_ROLES":
      viewRoles();
      break;
    case "VIEW_EMPLOYEES":
      viewEmployees();
      break;
    case "ADD_DEPARTMENT":
      addDepartment();
      break;
    case "ADD_ROLE":
      addRole();
      break;
    case "ADD_EMPLOYEE":
      addEmployee();
      break;
    case "UPDATE_EMPLOYEE":
      updateEmployee();
      break;
    case "EXIT":
      process.exit();
      break;
    default:
      process.exit;
  }
};

// View all departments
const viewDepartments = async () => {
  try {
    const [departmentData] = await db.query("SELECT * FROM department");
  console.table(departmentData);
  mainMenu();
  } catch (error) {
    res.status(400).json({ error: err.message });
      return;
  }
};

// View all employee roles
const viewRoles = async () => {
  try {
    const [roleData] = await db.query("SELECT * FROM role");
  console.table(roleData);
  mainMenu();
  } catch (error) {
    res.status(400).json({ error: err.message });
      return;
  }
};

// View all employees
const viewEmployees = async () => {
  try {
    const [employeeData] = await db.query("SELECT * FROM employee");
    console.table(employeeData);
    mainMenu();
  } catch (error) {
    res.status(400).json({ error: err.message });
      return;
  }
};

// Add new department
const addDepartment = async () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDept",
        message: "Enter new department name: ",
      },
    ])
    .then(answer => {
        const newDept = `INSERT INTO department (name)
        VALUES (?)`;
        db.query(newDept, answer.addDept, (err, result) => {
            if (err) throw err;
            console.log('Added ' + answer.addDept + 'to departments!');
        })
        viewDepartments();
    })
    .catch(() => {
        res.status(400).json({ error: err.message });
        return;
    });
};

// Add new employee role
const addRole = async () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "Enter new role: ",
      },
      {
        type: "number",
        name: "salary",
        message: "Enter salary for new role: ",
      },
      {
        type: "number",
        name: "departmentId",
        message: "Enter department ID for new role: ",
      },
    ])
    .then(answer => {
    try {
      const newRole = [answer.roleName, answer.salary, answer.departmentId];
        db.query(`INSERT INTO role (roleName, salary, departmentId)
        VALUES (?, ?, ?)`, [newRole],)
      viewRoles();
    } catch (error) {
        res.status(400).json({ error: err.message });
          return;
      }
    });
};

// Add new employee
const addEmployee = async () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter employee's first name: ",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter employee's last name: ",
      },
      {
        type: "list",
        name: "role",
        message: "Choose employee role:",
        choices: [],
      },
      {
        type: "input",
        name: "managerName",
        message: "Enter employee's manager name: ",
      },
      // TODO something here
    ])
    .then(() => {
      mainMenu();
    });
};

// Update employee role
const updateEmployee = async () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeToUpdate",
        message: "Which employee would you like to update? ",
        choices: [],
      },
      {
        type: "list",
        name: "newEmployeeRole",
        message: "What is the employee's new role?",
        choices: [],
      },
      // TODO something here
    ])
    .then(() => {
      mainMenu();
    });
};

mainMenu();
