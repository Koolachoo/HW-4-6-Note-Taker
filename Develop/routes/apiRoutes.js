

module.exports = function(app) {
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

    app.delete("/api/notes/:id", function (req, res) {
        var id = req.params.id;
        var note = notesArr[id];
        notesArr = notesArr.splice(parseInt(id));
        console.log("notesArr", notesArr);
        fs.writeFile(__dirname + "./db/db.json", JSON.stringify(notesArr), function () {
        
            res.json(note);
        })
    });
}