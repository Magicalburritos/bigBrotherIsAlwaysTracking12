-- INSERT INTO department(departmentName)
-- VALUES ("Engineering"),("Sales"),("Finance"),("Legal"),("Marketing")

-- INSERT INTO roles(title, salary, departmentId)
-- VALUES ("Engineer", 90000, 2), ("Senior Engineer", 130000, 2), ("CFO", 400000, 3), ("Chief" , 350000, 4)

-- INSERT INTO employee(firstName, lastName, roleId, managerId)
-- VALUES("Joseph","Hudak" 1, 2), ("Hivernal","Apsalar",1 ,2), ("Zach","Wheeler",2,2)

INSERT INTO department(departmentName)
VALUES("Engineering"), ("Sales"), ("Finance"), ("Legal"), ("Marketing");

INSERT INTO roles(title, salary, departmentId)
VALUES("Engineer", 90000, 1), ("Senior Engineer", 120000, 1), ("CFO", 45000, 3), ("CEO", 600000, 4);

INSERT INTO employee(firstName, lastName, rolesId, managerId)
VALUES ('Joseph', 'Hudak', 1, 2), ('Hivernal', 'Apsalar', 1, null), ('Zach', 'Wheeler', 1, 2);