const express = require('express');
const bodyParser = require('body-parser');
const Book = require('../models/books');

const router = express.Router();
router.use(bodyParser.json());

let books = [
    new Book(1, 'Book 1', 'Author 1'),
    new Book(2, 'Book 2', 'Author 2'),
    new Book(3, 'Book 3', 'Author 3'),
];

// Read
router.get('/', (req, res) => {
    res.json(books);
});

// Edit
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(book => book.id === id);
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
});

// Create
router.post('/', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(404).json({ message: 'Title and Author are required' });
    }
    const id = books.length + 1;
    const newBook = new Book(id, title, author);
    books.push(newBook);
    res.status(201).json(newBook);
});

// Update
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body();
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex == -1) {
        return res.status(404).json({ message: 'Book not found' });
    }
    if (!title || !author) {
        return res.status(404).json({ message: 'Title and author are required' });
    }
    books[bookIndex] = new Book(id, title, author);
    res.json(books[bookIndex]);
});

// Delete
router.delete('/:id', (req, res) => {
    const id = parseInt(req, params.id);
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }
    books.splice(bookIndex, 1);
    res.sendStatus(204);
});

module.exports = router;