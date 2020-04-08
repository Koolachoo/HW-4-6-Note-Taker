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
    fs.writeFile(__dirname + '/db/db.json', JSON.stringify(notesArr), function(notesArr){
        res.json(newNote);
    })
});

app.delete('/api/notes/:id', function(req, res){
    var id = req.params.id;
    var note = notesArr[id];
    notesArr.slice(id, id + 1);
    console.log('')
    res.json(note);
})

app.listen(PORT, function(){
    console.log('listening');
})