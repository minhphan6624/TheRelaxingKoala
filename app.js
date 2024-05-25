
const express = require('express')
//const sequelize = require('./Config/database');
const path = require('path');
const app = express();
const port = 3000;

//Set up view engine
//app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.static(path.join(__dirname, 'Views')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views, index.html'));
});

//Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
