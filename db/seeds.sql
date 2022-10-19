USE employees;

INSERT INTO department 
    (name)
VALUES
    ('Sales'),
    ('Resources'),
    ('Finance'),
    ('Shipping');

INSERT INTO role 
    (title, salary, department_id)
VALUES
    ('Branch Co-Manager', 160000, 1),
    ('Sales Associate', 90000, 1),
    ('Customer Service', 40000, 2),
    ('Supplier Relations', 55000, 2),
    ('Human Resources', 60000, 2),
    ('Head of Accounting', 80000, 3),
    ('Accountant', 65000, 3),
    ('Warehouse Associate', 45000, 4);

INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Jim', 'Halpert', 1, NULL),
    ('Dwight', 'Schrute', 1, NULL),
    ('Pam', 'Beesly', 2, NULL),
    ('Angela', 'Martin', 6, NULL),
    ('Kelly', 'Kapoor', 3, NULL),
    ('Andy', 'Bernard', 2, NULL),
    ('Ryan', 'Howard', 2, NULL),
    ('Toby', 'Flenderson', 5, NULL),
    ('Kevin', 'Malone', 7, NULL),
    ('Stanley', 'Hudson', 2, NULL),
    ('Oscar', 'Martinez', 7, NULL),
    ('Meredith', 'Palmer', 4, NULL),
    ('Daryll', 'Philbin', 8, NULL),
    ('Phyllis', 'Vance', 2, NULL);