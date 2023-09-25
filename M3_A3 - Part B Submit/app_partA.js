const express = require('express');
const app = express();

const welComeMiddlewared = (req, res, next) => {
    console.log('Welcome to my website');
    next();
}

app.use(welComeMiddlewared);

const checkAdmin = (req, res, next) => {
    if(req.query.admin === 'true') {
        next();
    } else {
        res.status(400).send('Should be admin');
    }
}

app.get('/', (req, res) => {
    res.send('Hello Word');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});