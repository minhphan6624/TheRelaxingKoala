
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const port = 3000;

//Set up view engine
app.set('view engine', 'ejs');

//Middleware to parse JSON bodies
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.static(path.join(__dirname, 'Views')));

//Home page route
app.get('/', (req, res) => {
    res.render('index');
});

//Menu route
app.get('/menu', (req, res) => {
    res.render('menu')
})

app.get('/reservation', (req, res) => {
    res.render('reservation')
})

app.get('/order', (req, res) => {
    res.render('order')
})

//Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
