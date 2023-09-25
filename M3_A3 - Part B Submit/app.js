// Gustavo Olgiati

const express = require('express');
const app = express();

// Array for local storage
const students = [];

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Custom Middleware Change the name to uppercase
const makeUpperCase = (req, res, next) => {
    const student = req.body;

    if(req.body.fname == undefined || req.body.mname == undefined || req.body.lname == undefined) {
        return res.send('Please enter a valid name');
    }

    req.body.fname = student.fname.toUpperCase();
    req.body.mname = student.mname.toUpperCase();
    req.body.lname = student.lname.toUpperCase();
    next();

}

// Authentication Middleware
const checkAdmin = (req, res, next) => {
    if(req.query.admin === 'true') {
        next();
    } else {
        res.status(400).send('Should be admin')
    }
}

// Global Middleware
app.use(makeUpperCase);

const getSpecificStudent = (req, res) => {
    const id = req.params.id;
    const currentStudent = students[id];
    res.send(`Student with the ${id} is ${currentStudent.fname} ${currentStudent.mname} ${currentStudent.lname} `);
}

const getStudents = (req, res) => {
    res.send(students);
}

const addStudent = (req, res) => {
    const student = req.body;
    students.push(student);
    res.send(`Student with the name ${student.fname} ${student.mname} ${student.lname} added to the database`);
}

const updateStudent = (req, res) => {
    const id = req.params.id;
    const student = req.body;
    students[id] = student;
    res.send(`Student with the id ${id} has been updated`);
}

const deleteStudent = (req, res) => {
    const id = req.params.id;
    const student = students[id];
    students.splice(id, 1);
    res.send(`Student with the ${id} has been deleted`);
}

// Routes handlers CRUD interfaces for every request we have a response

// Get an specific student function
app.get('/students/:id', checkAdmin, getSpecificStudent);

// Get all students function
app.get('/students', getStudents);

// Add student function
app.post('/students', addStudent);

// Update student
app.put('/students/:id', updateStudent);

// Delete student
app.delete('/student/:id', checkAdmin, deleteStudent);

// Root
app.use('/', function(req, res, next) {
    console.log('Request url: ' + req.url);
    req.send('Hello');
});

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
})





