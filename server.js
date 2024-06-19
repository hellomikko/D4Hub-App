const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/load', (req, res) => {
    res.send('<div class="notification is-primary">Content loaded with HTMX!</div>');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
