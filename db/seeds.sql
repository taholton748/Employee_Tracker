USE employees;

INSERT INTO department 
    (name)
VALUES
    ('Sales'),
    ('IT'),
    ('Legal'),
    ('Engineering'),
    ('Finance');

INSERT INTO role 
    (title, salary, department_id)
VALUES
    ('Sales Lead', 75000, 1),
    ('IT Support', 1000000, 2),
    ('Lawyer', 30000, 3),
    ('Engineer', 150000, 4),
    ('Accountant', 51000, 5);

INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Tyler', 'Holton', 1, NULL),
    ('Tyler', 'Holton', 4, NULL),
    ('Tyler', 'Holton', 5, NULL),
    ('Tyler', 'Holton', 3, NULL);