USE employee_tracker_db

INSERT INTO DEPARTMENT (NAME)
VALUES
("Administration"),
("Customer Service"),
("Finance"),
("Human Resources"),
("Sales"),
("Warehouse");



INSERT INTO ROLES (TITLE, SALARY, DEPT_ID)
VALUES
("Accountant", 55000, 3),
("Customer Relations", 50000, 2),
("Head Accountant", 60000, 3),
("Head of Quality Assurance", 60000, 1),
("Head of Supplier Relations", 50000, 2),
("Human Resource Officer", 60000, 4),
("Office Administrator", 60000, 1),
("Regional Manager", 70000, 1),
("Receptionist", 40000, 1),
("Sales Rep", 60000, 5),
("Temp", 30000, 2),
("Warehouse Foreman", 60000, 6),
("Warehouse Worker", 40000, 6);



INSERT INTO EMPLOYEES (FIRST_NAME, LAST_NAME, ROLE_ID, MANAGER_ID)
VALUES
("Michael", "Scott", 8, null),
("Toby", "Flenderson", 6, null),
("Angela", "Martin", 3, 1),
("Meredith", "Palmer", 5, 1),
("Darryll", "Philbin", 12, 1),
("Dwight", "Schrute", 10, 1),
("Pam", "Halpert", 7, 1),
("Jim", "Halpert", 10, 1),
("Andy", "Bernard", 10, 1),
("Stanley", "Hudson", 10, 1),
("Phyllis", "Lapin", 10, 1),
("Ryan", "Howard", 11, 1),
("Creed", "Bratton", 4, 1),
("Erin", "Hannon", 9, 1),
("Oscar", "Martinez", 1, 3),
("Kevin", "Malone", 1, 3),
("Kelly", "Kapoor", 2, 4),
("Val", "Johnson", 13, 5);

