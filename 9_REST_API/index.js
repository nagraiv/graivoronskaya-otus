const express = require('express');
const path = require('path');
const fs = require('fs');
const { marked } = require('marked');

const cookieParser = require("cookie-parser");
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");
const app = express();

app.get('/hello', function(req, res) {
    res.send('Hello, ' + req.query.name);
});

app.get('/hello/:id', function(req, res) {
    res.send('Hello, user! Your ID is ' + req.params.id);
});

app.get('/', function(req, res) {
    const filePath = path.join(__dirname, '/public/README.md');
    fs.readFile(filePath, "utf-8", (err, result) => {
        res.send(marked(result.toString()));
    });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const api = require('./routes');
app.use('/', api);

app.listen(3000, () => console.log(`Server started at 3000 port...`));

