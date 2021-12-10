INSERT INTO department (name)
VALUES ("Human resources"),
       ("Manifacturing"),
       ("Accounting and finance"),
       ("Engenering");

INSERT INTO role (title, salary,department_id)
VALUES ("Secretaria",89565,1),
       ("Molding operator",56999,2),
       ("Operations manager",125899,3),
       ("Receptionist",78595,3);
       

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("MERYEM","ADIRI",1,NULL),
       ("SALMA","FK",3,1),
       ("JHON","MOTA",4,1),
       ("JACKOB","LAWRNS",4,2),
       ("GIGI","YEMU",2,1);