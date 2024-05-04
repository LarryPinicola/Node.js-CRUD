const express = require('express');
const bodyParser = require('body-parser');
const Book = require('../models/books');
const db = require('../database');

const router = express.Router();
router.use(bodyParser.json());

let books = [
    new Book(1, 'Book 1', 'Author 1'),
    new Book(2, 'Book 2', 'Author 2'),
    new Book(3, 'Book 3', 'Author 3'),
];

// Read or Get all books
// router.get('/', (req, res) => {
//     res.json(books);
// });

router.get('/', (req, res) => {
    db.all('SELECT * FROM books', [], (err, rows) => {
        if (err) {
            res.status(400).json({ 'error': err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    })
})

// Edit
// router.get('/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const book = books.find(book => book.id === id);
//     if (!book) {
//         return res.status(404).json({ message: 'Book not found' });
//     }
//     res.json(book);
// });
// Get single book by ID

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(400).json({ 'error': err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        })
    })

})

// Create
// router.post('/', (req, res) => {
//     const { title, author } = req.body;
//     if (!title || !author) {
//         return res.status(404).json({ message: 'Title and Author are required' });
//     }
//     const id = books.length + 1;
//     const newBook = new Book(id, title, author);
//     books.push(newBook);
//     res.status(201).json(newBook);
// });


// Create a new book
router.post('/', (req, res) => {
    const { title, author } = req.body;
    db.run(`INSERT INTO books (title, author) VALUES (?,?)`, [title, author], function (err) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.status(201).json({
            "message": "A new book has been created",
            "data": { id: this.lastID, title, author }
        })
    })
})

// Update
// router.put('/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const { title, author } = req.body();
//     const bookIndex = books.findIndex(book => book.id === id);
//     if (bookIndex == -1) {
//         return res.status(404).json({ message: 'Book not found' });
//     }
//     if (!title || !author) {
//         return res.status(404).json({ message: 'Title and author are required' });
//     }
//     books[bookIndex] = new Book(id, title, author);
//     res.json(books[bookIndex]);
// });

// Update a book
router.put('/:id', (req, res) => {
    const { title, author } = req.body;
    const id = req.params.id;
    db.run(`UPDATE books SET title = ?, author = ? WHERE id = ?`, [title, author, id], function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            message: "Book updated",
            data: { id, title, author },
            changes: this.changes
        });
    })
})

// Delete
// router.delete('/:id', (req, res) => {
//     const id = parseInt(req, params.id);
//     const bookIndex = books.findIndex(book => book.id === id);
//     if (bookIndex === -1) {
//         return res.status(404).json({ message: 'Book not found' });
//     }
//     books.splice(bookIndex, 1);
//     res.sendStatus(204);
// });

// Delete a book
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.run(`DELETE FROM books WHERE id = ?`, id, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "deleted", changes: this.changes });
    })
})

module.exports = router;