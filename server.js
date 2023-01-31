const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express(); 
const PORT = process.env.PORT || 3001;

// Here we tell Express where our folder is for static assets
app.use(express.static('public'));

// Here we set up express to properly read and parse form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route for home page and note page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('api/notes', (req, res) =>{
    
})