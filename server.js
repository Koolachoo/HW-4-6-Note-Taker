
var express = require("express");
var fs = require("fs");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

var notesArr = [];

app.use(express.static("public"));







app.listen(PORT, function () {
    fs.readFile(__dirname + "/db/db.json", function (err, data) {
        if (err) throw err;
        notesArr = JSON.parse(data);
    })
    console.log("listening");
})