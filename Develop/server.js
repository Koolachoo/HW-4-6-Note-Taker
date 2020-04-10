var express = require('express');
var fs = require('fs');
var app = express();

var notesArr = [];

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/notes', function(req, res) {
    fs.readFile(__dirname + 'db/db.json', function(err,data){
        if(err) throw err;
        res.json(data);
    });
});

app.post('/api/notes', function (req, res){
    var newNote = req.body;
    notesArr.push(req.body);
    fs.writeFile(__dirname + '/db/db.json', JSON.stringify(notesArr), function(err){
        res.json(newNote);
    })
});

app.delete('/api/notes/:id', function(req, res){
    var id = req.params.id;
    var note = notesArr[id];
    notesArr = notesArr.splice(parseInt(id));
    console.log('notesArr', notesArr);
    fs.writeFile(__dirname + '/db/db.json', JSON.stringify(notesArr), function(err){
        res.json(note);
    if(err) throw err;
    res.json(note);
})
})

app.listen(PORT, function(){
    fs.readFile(__dirname + '/db/db.json', function(err, data){
        if(err) throw err;
        notesArr = JSON.parse(data);
    })
    console.log('listening');
})