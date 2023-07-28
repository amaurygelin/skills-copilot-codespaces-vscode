// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

// Use body parser to parse JSON body
app.use(bodyParser.json());

// Use static files in public folder
app.use(express.static('public'));

// Get comments from JSON file
app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading file from disk:', err);
            res.sendStatus(500);
        } else {
            const comments = JSON.parse(data);
            res.send(comments);
        }
    });
});

// Add new comment to JSON file
app.post('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading file from disk:', err);
            res.sendStatus(500);
        } else {
            const comments = JSON.parse(data);
            comments.push(req.body);

            fs.writeFile('./comments.json', JSON.stringify(comments, null, 4), (err) => {
                if (err) {
                    console.log('Error writing file:', err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});