var express = require("express");
var fs = require("fs");

var notesArr = [];

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes", function(req, res) {
    res.json(notesArr);
    res.sendFile(path.join(__dirname, "public/notes.html"))
});


app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    notesArr.push(newNote);
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notesArr), function(err) {
        res.json(newNote);
    })
});

app.delete("/api/notes/:id", function(req, res) {
    var id = req.params.id;
    var note = notesArr[id];
    notesArr = notesArr.splice(parseInt(id));
    console.log("notesArr", notesArr);
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notesArr), function(err) {
        if(err) throw err;
        res.json(note);
    }) 
});

app.listen(PORT, function() {
    fs.readFile(__dirname + "/db/db.json", function(err, data) {
        if(err) throw err;
        notesArr = JSON.parse(data);
    })
    console.log("listening");
})