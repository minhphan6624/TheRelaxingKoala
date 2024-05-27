
const express = require('express')
//const sequelize = require('./Config/database');
const path = require('path');
const app = express();
const port = 3000;

//Set up view engine
app.set('view engine', 'ejs');

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

//Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
