const inquirer = require('inquirer');
const db = require('./config/connection');
const { printTable } = require('console-table-printer');
const testCases =[];
const ids =[];

const rolesName=[];
const rolesId=[];
const emlyNames =[];
const emlyId=[];
 

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
        case 'View All Departmnent' : getAllDepartment();break;
        /////////////////////////////////////////////////////////////
       case 'View All Roles' :   getAllRoles();break;
        ///////////////////////////////////////////////////////////
       case 'View All Employees' :  getAllEmployees();break;
        ///////////////////////////////////////////////////////////////
        case 'add new Department' : addNewDepartment();break;
      //////////////////////////////////////////////////////////////
       case 'add new Role' : addNewRole();break;
        ////////////////////////////////////////////////////////////////
       case 'add new Employee' :  addNewEmployee();break;
         case 'Exit':console.log('By!!!');db.end();process.exit();

        default: console.log( "no selected option");db.end();process.exit();
          }
    });
  
  }

/***************************** View ALL DEPARTMENT ****************************************** */
  async function getAllDepartment(){
   await mainDep().catch((err)=>console.error(err));
   init();
  }

  const mainDep =()=>{

    return new Promise((resolve,reject)=>{


      db.query('SELECT id , name AS Department FROM department ', function (err, results) {

        if(results){

         resolve(results);
         testCases.length =0;
        for (let i=0;i<results.length;i++){
          testCases.push({ id: results[i].id, Department: results[i].Department},)
        }

        //print
console.log('\n***************** See all Department***************************\n');
printTable(testCases);

        }
        //err.sqlMessage
        else { 
          reject(new Error("Sorry , Server is down,Please come back later "));
        }
  
   });})
}

  //////////////////  Add Department /////////////////////

  
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
  db.query(`INSERT INTO department (name) VALUES (?)`,answer.Dept_name);
  init();
  
  });

  }



/*********************************************************************** */



/*****************************  View ALL Roles ****************************************** */

async function getAllRoles(){
  await mainRoles().catch((err)=>console.error(err));
  init();
  
}

const mainRoles = ()=>{


  return new Promise((resolve,reject)=>{

    db.query('SELECT role.title as Role , CONCAT(role.salary," ","$") AS Salary ,department.name AS Department FROM role JOIN  department ON role.department_id = department.id;', function (err, results) {

      if(results){

       resolve(results);
       testCases.length =0;    
       for (let i=0;i<results.length;i++){
         testCases.push({ Role: results[i].Role, Salary: results[i].Salary,Department:results[i].Department},)
       }
   

      //print
console.log('\n***************** See all Roles ***************************\n');
printTable(testCases);

      }
      //err.sqlMessage
      else { 
        reject(new Error("Sorry , Server is down,Please come back later "));
   
  }

 });

  })

}


///////////////////////////// Add Role /////////////////////////////////////

const  addNewRole= ()=>{


  db.query('SELECT id , name AS Department FROM department ', function (err, results) {

    testCases.length=0;
    ids.length=0;

    for (let i=0;i<results.length;i++){
      testCases.push(results[i].Department);
      ids.push(results[i].id)
      
    }


});



inquirer
.prompt([
   {
       name: "title",
       type: "input",
       message: "Please enter the role's title.",
       validate : function(value){
         if (value)  return true ; else return 'Try again';
     }

   },
   {
       name: "salary",
       type: "input",
       message: "Please enter the role's salary.",
       validate : function(value){
         if (value)  return true ; else return 'Try again';
     }

   },
   {
       name: "department",
       type: "list",
       message: "Please select the department that that role will belongs to :",
      choices : testCases,
       validate : function(value){
         if (value)  return true ; else return 'Try again';
     }


   }

]).then(answers => {

const index = testCases.indexOf(answers.department);

   db.query(`INSERT INTO role (title, salary,department_id)
   VALUES ("${answers.title}",${parseInt(answers.salary)},${ids[index]});`);

   
init();
})

}

//////////////////////////////////////////////////////////////////////////////////




////////////////////////////////// View All Employees ///////////////////////////////////////////////////


async function getAllEmployees(){

await mainEmp().catch((err)=>console.error(err));
init();


}


const mainEmp= ()=>{
  return new Promise((resolve,reject)=>{

     db.query(`
     SELECT CONCAT(sub.first_name," ",sub.last_name) AS Employee,role.title AS Role , CONCAT(role.salary," ","$") AS Salary,
        CONCAT(sup.first_name," ",sup.last_name) AS Manager
     FROM employee sub
     JOIN role ON sub.role_id = role.id 
     left JOIN employee sup
     ON sub.manager_id = sup.id
     ORDER BY sup.id ;`, function (err, results) {

      if(results){

       resolve(results);
       testCases.length =0;    
        for (let i=0;i<results.length;i++){
        testCases.push({ Employee: results[i].Employee, Role: results[i].Role,Salary:results[i].Salary,Manager:results[i].Manager},)
      }
   

//print
console.log('\n***************** See all Emoloyees***************************\n');
printTable(testCases);
      }
      //err.sqlMessage
      else { 
        reject(new Error("Sorry , Server is down,Please come back later "));
   
  }

 });

  })

}

//////////////////////////////////// Add new Employee ////////////////////////////////////////////////




  const addNewEmployee=()=>{

  db.query('SELECT id , title AS role FROM role; ', function (err, results) {

    rolesName.length=0;
    rolesId.length=0;

    for (let i=0;i<results.length;i++){
      rolesName.push(results[i].role);
      rolesId.push(results[i].id)
      
    }

});


db.query('SELECT id,CONCAT(first_name," ",last_name) AS Employee FROM employee; ', function (err, results) {

  emlyNames.length=0;
  emlyId.length=0;

  for (let i=0;i<results.length;i++){
    emlyNames.push(results[i].Employee);
    emlyId.push(results[i].id)
    
  }
  emlyNames.push("null");




});


     
      
    inquirer
    .prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the employee's first name?",
            validate : function(value){
              if (value)  return true ; else return 'Try again';
          }
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the employee's last name?",
            validate : function(value){
              if (value)  return true ; else return 'Try again';
          }
        },
        {
            name: "role",
            type: "list",
            message: "Please select the role 's title ",
            choices :rolesName,
            validate : function(value){
              if (value)  return true ; else return 'Try again';
          }

        },
        {
            name: "manager",
            type: "list",
            message: "Please select an employee as a manager",
            choices :emlyNames,
        }
    ]).then(answers => {

      const indexRole = rolesName.indexOf(answers.role);
      const indexEmpl = emlyNames.indexOf(answers.manager);

      if (emlyId[indexEmpl]===undefined) {emlyId[indexEmpl] = null}
      console.log(`INSERT INTO employee (first_name,last_name,role_id,manager_id)
      VALUES ("${answers.first_name}","${answers.last_name}",${rolesId[indexRole]},${emlyId[indexEmpl]});`)

  db.query(`INSERT INTO employee (first_name,last_name,role_id,manager_id)
  VALUES ("${answers.first_name}","${answers.last_name}",${rolesId[indexRole]},${emlyId[indexEmpl]});`);


  init();
  
  });

  }


////////////////////////////////////////////////////////////////////////////




  module.exports= {init};