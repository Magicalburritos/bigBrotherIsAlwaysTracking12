
INSERT INTO department(departmentName)
VALUES("Engineering"), ("Sales"), ("Finance"), ("Legal"), ("Marketing");

INSERT INTO roles(title, salary, departmentId)
VALUES("Engineer", 90000, 1), ("Senior Engineer", 120000, 1), ("CFO", 45000, 3), ("Manager", 150000, 4);

INSERT INTO employee(firstName, lastName, rolesId, managerId)
VALUES ('Joseph', 'Hudak', 1, 2), ('Hivernal', 'Apsalar', 1, null), ('Zach', 'Wheeler', 1, 2), ('Man', 'Ager', 4, 4);