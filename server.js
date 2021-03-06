var path = require("path");
var express = require("express");
var fs = require("fs");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var notesArr = [];

app.use(express.static("public"));


app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json","utf8", function (error) {
        if (error) throw error;
        res.json(notesArr);
    });
});


app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    notesArr.push(newNote);
    fs.writeFile(__dirname + "./db/db.json", JSON.stringify(notesArr), function (err) {
      
        res.json(newNote);
    });
  
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.delete("/api/notes/:id", function (req, res) {
    var id = req.params.id;
    var note = notesArr[id];
    notesArr = notesArr.splice(parseInt(id));
    console.log("notesArr", notesArr);
    fs.writeFile(__dirname + "./db/db.json", JSON.stringify(notesArr), function () {
    
        res.json(note);
    })
});

app.listen(PORT, function () {
    fs.readFile("./Develop/db/db.json","utf8", function (err, data) {
        if (err) throw err;
        notesArr = JSON.parse(data);
    })
    console.log("listening");
})