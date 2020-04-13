var path = require("path");
var express = require("express");
var fs = require("fs");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var notesArr = [];

app.use(express.static("public"));

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);





app.listen(PORT, function () {
    fs.readFile(__dirname + "/db/db.json", function (err, data) {
        if (err) throw err;
        notesArr = JSON.parse(data);
    })
    console.log("listening");
})