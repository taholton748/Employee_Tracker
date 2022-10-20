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
          value: "UPDATE_EMPLOYEE",
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
    .then((answer) => {
      const newDept = `INSERT INTO department (name)
        VALUES (?)`;
      db.query(newDept, answer.addDept, (err, result) => {
        if (err) throw err;
        console.log("Added " + answer.addDept + "to departments!");
      });
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
    .then((answer) => {
      try {
        const newRole = [answer.roleName, answer.salary, answer.departmentId];
        db.query(
          `INSERT INTO role (title, salary, department_id)
        VALUES (?)`,
          [newRole]
        );
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
        type: "input",
        name: "role",
        message: "Enter employee role ID: ",
      },
      {
        type: "input",
        name: "managerName",
        message: "Enter employee's manager ID: ",
      },
    ])
    .then((answer) => {
      try {
        const newEmployee = [
          answer.firstName,
          answer.lastName,
          answer.role,
          answer.managerName,
        ];
        db.query(
          `INSERT INTO employee (first_name, last_name, role_id, manager_id)
          VALUES (?)`,
          [newEmployee]
        );
        viewEmployees();
      } catch (error) {
        res.status(400).json({ error: err.message });
        return;
      }
    });
};

// Update employee role
const updateEmployee = async () => {
  const [employeeData] = await db.query (`SELECT * FROM employee`);
console.table(employeeData);
  const employeeId = await inquirer.prompt([
    {
      type: "input",
      name: "employeeToUpdate",
      message: "Enter employee ID you would like to update: ",
    },
  ]);
  const [roleData] = await db.query (`SELECT * FROM role`);
console.table(roleData);
  const roleId = await inquirer.prompt([
    {
      type: "input",
      name: "newEmployeeRole",
      message: "Enter new role ID: ",
    },
  ]);

  const updateEmployee = [roleId.newEmployeeRole, employeeId.employeeToUpdate];
  const sqlQuery = `UPDATE employee SET role_id = ? WHERE id = ? `;

  db.query(sqlQuery, updateEmployee);
  viewEmployees();
};

mainMenu();
