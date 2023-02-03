const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');

const app = express(); 
const PORT = process.env.PORT || 3001;


app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route for home page and note page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

// request to read existing notes
app.get('/api/notes', (req, res) =>{
    fs.readFile('./db/db.json', 'utf8', (err, data) =>{
        if(err){
            console.log(err);
        }else{
            res.json(JSON.parse(data))
            console.log('Request to get notes received');
        }
    })
})

// request to add a note
app.post('/api/notes', (req, res) =>{
    console.log('save request received')
    console.log(`entered post ${req.body}`)

    //if the new note has a title and text, create a new object
    const {title, text} = req.body;
    if (title && text){
        const newNote = {
            title,
            text,
            id: uuid()
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) =>{
            console.log('readfile data: ' + JSON.parse(data))
            if(err){
                console.log(err);
            }else{
                //push the new note into allNotes array
                console.log('data line 55: ' + JSON.parse(data))
                let allNotes = JSON.parse(data);
                allNotes.push(newNote);
    
                //rewrite db.json with new note array
                fs.writeFile('./db/db.json', JSON.stringify(allNotes), err =>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log('Note added')
                    }
                });
            }
        });

        const response = {
            status: 'success',
            body: newNote,
        };

        res.status(201).json(response)    
    }else{
        res.status(500).json('Error in posting')
    }
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);