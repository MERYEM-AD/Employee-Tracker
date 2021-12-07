const inquirer = require('inquirer');
// const db = require('./config/connection');
const {getAllDepartment ,getAllRoles,getAllEmployees} =require('./options/Allviews');
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
        case 'View All Departmnent' : getAllDepartment();init();break;
        case 'View All Roles' :   getAllRoles();init();break;
        case 'View All Employees' :  getAllEmployees();init();break;
        case 'add new Department' :break;
        case 'add new Role' : break;
        case 'add new Employee' :  break;
        case 'Exit':console.log('By!!!');process.exit();

        default: console.log( "no selected option");process.exit();
          }
    });
  
  }



  module.exports= {init};