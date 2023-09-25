// Gustavo Olgiati

const express = require('express');
const app = express();

// Array for local storage
const students = [];

const bodyParser = require('body-parser');
app.use(bodyParser.json());

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
app.get('/students/:id', getSpecificStudent);

// Get all students function
app.get('/students', getStudents);

// Add student function
app.post('/students', addStudent);

// Update student
app.put('/students/:id', updateStudent);

// Delete student
app.delete('/student/:id', deleteStudent);

// Root
app.use('/', function(req, res, next) {
    console.log('Request url: ' + req.url);
    req.send('Hello');
});

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
})





