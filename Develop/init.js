const inquirer = require('inquirer');
const db = require('./config/connection');
const { printTable } = require('console-table-printer');
// const {getAllDepartment ,getAllRoles,getAllEmployees} =require('./options/Allviews');

const listOptions = 
 [ {
      type: 'list',
      name: 'option',
      message: 'Please select an option : ',
      choices : ['View All Departmnent','View All Roles','View All Employees','add new Department','add new Role','add new Employee','Exit'] 
  }];

const init = () =>{


    inquirer
    .prompt(listOptions)
    .then((answers) => {
      console.log(answers.option)
   
      switch(answers.option){
        case 'View All Departmnent' :  getAllDepartment();init();break;
        /////////////////////////////////////////////////////////////
        case 'View All Roles' :   getAllRoles();init();break;
        ///////////////////////////////////////////////////////////
        case 'View All Employees' :  getAllEmployees();init();break;
        ///////////////////////////////////////////////////////////////
        case 'add new Department' : addNewDepartment();break;
      //////////////////////////////////////////////////////////////
        case 'add new Role' : addNewRole();break;
        ////////////////////////////////////////////////////////////////
        case 'add new Employee' :  addNewEmployee();break;
         case 'Exit':console.log('By!!!');process.exit();

        default: console.log( "no selected option");process.exit();
          }
    });
  
  }


  const getAllDepartment =()=>{

    db.query('SELECT id , name AS Department FROM department ', function (err, results) {
          const testCases = [];
          for (let i=0;i<results.length;i++){
            testCases.push({ id: results[i].id, Department: results[i].Department},)
          }

//print
console.log('\n***************** See all Department***************************\n');
printTable(testCases);


      // Object.keys(results).forEach(function(key) {
      //    var row = results[key];
      //    AllDepartment.push(row.Department);
      //   // console.log(row.Department)
      //    console.log(AllDepartment)
      //  });

    
     });
  }


  const getAllRoles  =()=>{
  
    db.query('SELECT role.title as Role , CONCAT(role.salary," ","$") AS Salary ,department.name AS Department FROM role JOIN  department ON role.department_id = department.id;', function (err, results) {

      const testCases = [];
      for (let i=0;i<results.length;i++){
        testCases.push({ Role: results[i].Role, Salary: results[i].Salary,Department:results[i].Department},)
      }

//print
console.log('\n***************** See all Roles***************************\n');
printTable(testCases);

     });
  }
  

  const getAllEmployees=()=>{
  
    db.query(`
    SELECT CONCAT(sub.first_name," ",sub.last_name) AS Employee,role.title AS Role , CONCAT(role.salary," ","$") AS Salary,
       CONCAT(sup.first_name," ",sup.last_name) AS Manager
    FROM employee sub
    JOIN role ON sub.role_id = role.id 
    left JOIN employee sup
    ON sub.manager_id = sup.id
    ORDER BY sup.id ;`, function (err, results) {
      const testCases = [];
      for (let i=0;i<results.length;i++){
        testCases.push({ Employee: results[i].Employee, Role: results[i].Role,Salary:results[i].Salary,Manager:results[i].Manager},)
      }

//print
console.log('\n***************** See all Emoloyees***************************\n');
printTable(testCases);
    
     })
  
  

  }


  const addNewDepartment = () =>{

    inquirer.prompt([
      {
          name: "Dept_name",
          type: "input",
          message: `Please ,Tap the Deprtment's name : `,
          validate : function(value){
            if (value)  return true ; else return 'Try again';
        }
  },
  
  ]).then(answer => {
  db.query(`INSERT INTO department (name) VALUES ("${answer.Dept_name}")`);
  init();
  
  });

  }

  const addNewRole = ()=>{

    inquirer
    .prompt([
        {
            name: "title",
            type: "list",
            message: "Please enter the role's title.",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least one character.";
            }

        },
        {
            name: "salary",
            type: "input",
            message: "Please enter the role's salary.",

        },
        {
            name: "department_id",
            type: "list",
            message: "Please enter the department id.",
            choices:`${AllDepartment}`,

        }

    ]).then(answers => {
        // Adds role to database

        db.query(`INSERT INTO role (title, salary,department_id)
        VALUES ("${answers.title}",${answers.salary},${answers.department_id});`);

     init();
    })
  }

  const addNewEmployee=()=>{

     
      
    inquirer
    .prompt([
        {
            name: "employeeFirst",
            type: "input",
            message: "What is the employee's first name?",
            validate : function(value){
              if (value)  return true ; else return 'Try again';
          }
        },
        {
            name: "employeeLast",
            type: "input",
            message: "What is the employee's last name?",
            validate : function(value){
              if (value)  return true ; else return 'Try again';
          }
        },
        {
            name: "role",
            type: "input",
            message: "Please enter the role id",
            validate : function(value){
              if (value)  return true ; else return 'Try again';
          }

        },
        {
            name: "manager",
            type: "input",
            message: "Please enter manager id",
            validate : function(value){
              if (value)  return true ; else return value =null;
          }
        }
    ]).then(answers => {
  db.query(`INSERT INTO employee (first_name,last_name,role_id,manager_id)
  VALUES ("${answers.employeeFirst}","${answers.employeeLast}",${answers.role},${answers.manager});`);


  init();
  
  });

  }


  module.exports= {init};