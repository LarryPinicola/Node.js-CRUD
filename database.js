const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./books.db', (error) => {
    if (error) {
        return console.error(error.message);
    }
    console.log('Connected to sqlite3 db');
});

db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL
)`, (err) => {
    if (err) {
        console.log('Error at creating table', err);
    } else {
        console.log('Table is created or already exists');
    }
});

module.exports = db;