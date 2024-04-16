const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./myMvcApp.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the myMvcApp database.');
});

db.close();