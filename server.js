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
          'Add Employee',
          'Add Role',
          'Add Department',
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

const viewAllDepartments = () => {
  const sql = `
  SELECT department.id, 
  department.departmentName AS De
   FROM department
    `

  server.query(sql, (error, res) => {
    if (error) throw error
    console.log('=======================================================')
    console.log(`                    Departments`)
    console.log('=======================================================')
    console.table(res)
    console.log('=======================================================')
  })
  promptUser()
}

const addEmployee = () => {
  const rolesSql = `SELECT * FROM roles`
  const managerSql = `SELECT * FROM employee`

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'please enter employees first name!',
        validate: (firstName) => {
          if (firstName) {
            return true
          } else {
            console.log('Please enter your employees frist name!')
            return false
          }
        },
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'please enter employees last name!',
        validate: (lastName) => {
          if (lastName) {
            return true
          } else {
            console.log('Please enter your employees last name!')
            return false
          }
        },
      },
    ])
    .then((answer) => {
      const input = [answer.firstName, answer.lastName]
      server.query(rolesSql, (err, res) => {
        if (err) throw err
        const roleList = res.map(({ title, id }) => ({
          name: title,
          value: id,
        }))
        console.log(roleList)
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'role',
              message: 'what is your employees role',
              choices: roleList,
            },
          ])
          .then((roleAnswer) => {
            input.push(roleAnswer.role)
            server.query(managerSql, (err, res) => {
              if (err) throw err
              const managerList = res.map(({ id, firstName, lastName }) => ({
                name: firstName + ' ' + lastName,
                value: id,
              }))
              inquirer
                .prompt([
                  {
                    type: 'list',
                    name: 'manager',
                    message: 'who is your employees manager!',
                    choices: managerList,
                  },
                ])
                .then((managerAnswer) => {
                  input.push(managerAnswer.manager)
                  const employeeSql = `
                  INSERT INTO employee(firstName, lastName, rolesId, ManagerId) 
                  VALUES (?,?,?,?)
                  `
                  server.query(employeeSql, input, (err) => {
                    if (err) throw err
                    viewAllEmployees()
                  })
                })
            })
          })
      })
    })
}

const addRole = () => {
  inquirer.prompt([
    {
      name: 'departmentName',
      type: 'list',
      message: 'what department is this role in!',
      choices: ['Engineer', 'Sales', 'Finance', 'Legal', 'Marketing'],
    },
    {
      name: 'newRole',
      type: 'input',
      message: 'What is the name of you new role?',
    },
    {
      name: 'salary',
      input: 'input',
      message: 'what is the salary of the new role?',
    },
  ])
}

const addDepartment = () => {}

const updateEmployeeRole = () => {}
