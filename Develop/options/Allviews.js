const db = require('../config/connection');
const cTable = require('console.table');


const getAllDepartment= ()=>{

    db.query('SELECT id , name AS Department FROM department ', function (err, results) {
      const table = cTable.getTable(results);
      console.log(`***************** See all Department*************** \n ${table} \n ****************************************\n`);
    
    
     })
  }
  
  
  const getAllRoles  =()=>{
  
    db.query('SELECT role.title as Role , CONCAT(role.salary," ","$") AS Salary ,department.name AS Department FROM role JOIN  department ON role.department_id = department.id;', function (err, results) {

        const table = cTable.getTable(results);
        console.log(`***************** See all Roles*************** \n ${table} \n ****************************************\n`);
    
    
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
        const table = cTable.getTable(results);
        console.log(`***************** See all Employees*************** \n ${table} \n ****************************************\n`);
    
    
     })
  
  

  }




module.exports= {getAllDepartment,getAllRoles,getAllEmployees};