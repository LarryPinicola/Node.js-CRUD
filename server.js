const express = require('express');
const bookRoutes = require('./routes/bookRoutes');
const hostname = '127.0.0.1';

const app = express();
const port = 5555;

app.use('/books', bookRoutes);

app.listen(port, hostname, () => {
    console.log(`Server running on http://${hostname}:${port}`);
})