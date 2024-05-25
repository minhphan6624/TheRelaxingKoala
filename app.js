
const express = require('express')
const sequelize = require('./Config/database');
const app = express();
const port = 3000;

//Set up view engine
app.set('view engine', 'ejs');


//Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
