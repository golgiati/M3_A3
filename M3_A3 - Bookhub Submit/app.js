// Gustavo Olgiati

const express = require('express');
const app = express();

const books = [];

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Global Middleware
// Log activity
const logger = (req, res, next) => {
    console.log(Date.now());
    console.log(req.method);
    console.log(req.url);
    next();
}

// Route middleware
// Check admin rights
const checkAdmin = (req, res, next) => {
    if(req.query.admin === 'true') {
        next();
    } else {
        res.status(400).send('Should be admin');
    }
}

// add book
const addBook = (req, res) => {
    const book = req.body;
    books.push(book);
    res.send(`Book with the name ${book.name} added to the database`);
}

// delete book
const deleteBook = (req, res) => {
    const id = req.params.id;
    const book = books[id];
    books.splice(id, 1);
    res.send(`Book with the ${id} has been deleted`);
}

// Root
app.get('/', logger, (req, res) => {
    res.send('Welcome to Bookhub');
});

app.post('/cart/add', logger, addBook);

app.delete('/cart/remove/:id', logger, checkAdmin, deleteBook);

app.listen(3000, () => console.log('Server is running on port 3000'));