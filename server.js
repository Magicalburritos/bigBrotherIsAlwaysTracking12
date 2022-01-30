const server = require('./config/connection')
const inquirer = require('inquirer')
const figlet = require('figlet')
const cTable = require('console.table')

server.connect((error) => {
  if (error) throw error
  console.log(
    `====================================================================================`
  )
  console.log(``)
  console.log(figlet.textSync('Employee Tracker'))
  console.log(``)
  console.log(``)

  console.log(
    `====================================================================================`
  )
  promptUser()
})

// Prompt User for Choices
const promptUser = () => {
  inquirer
    .prompt([
      {
        name: 'choices',
        type: 'list',
        message: 'Please select an option:',
        choices: [
          'View All Employees',
          'View All Roles',
          'View All Departments',
          'View All Employees By Department',
          'View Department Budgets',
          'Update Employee Role',
          'Update Employee Manager',
          'Add Employee',
          'Add Role',
          'Add Department',
          'Remove Employee',
          'Remove Role',
          'Remove Department',
          'Exit',
        ],
      },
    ])
    .then((answers) => {
      const { choices } = answers

      if (choices === 'View All Departments') {
        viewAllDepartments()
      }

      if (choices === 'View All Employees') {
        viewAllEmployees()
      }

      if (choices === 'View All Roles') {
        viewAllRoles()
      }

      if (choices === 'Add Department') {
        addDepartment()
      }

      if (choices === 'Add Role') {
        addRole()
      }

      if (choices === 'Add Employee') {
        addEmployee()
      }

      if (choices === 'Update Employee Role') {
        updateEmployeeRole()
      }

      if (choices === 'Exit') {
        connection.end()
      }
    })
}

const viewAllEmployees = () => {
  const sql = `
    SELECT employee.id,
    employee.firstName,
    employee.lastName,
    roles.title,
    department.departmentName,
    roles.salary
    FROM employee, roles, department
    WHERE department.id = roles.departmentId
    AND roles.id = employee.rolesID
    ORDER BY employee.id ASC`

  server.query(sql, (error, res) => {
    if (error) throw error
    console.log('=======================================================')
    console.log(`                    current employees`)
    console.log('=======================================================')
    console.table(res)
    console.log('=======================================================')
  })
  promptUser()
}

const viewAllRoles = () => {
  const sql = `
  SELECT roles.id,
  roles.title,
  department.departmentName AS department
  FROM roles
  INNER JOIN department ON roles.departmentId = department.id
   `

  server.query(sql, (error, res) => {
    if (error) throw error
    console.log('=======================================================')
    console.log(`                    Employee Roles`)
    console.log('=======================================================')
    res.forEach((roles) => {
      console.log(roles.title)
    })
    console.log('=======================================================')
  })
  promptUser()
}

const viewAllDepartments = () => {}

const addEmployee = () => {}

const addRole = () => {}

const addDepartment = () => {}

const updateEmployeeRole = () => {}
