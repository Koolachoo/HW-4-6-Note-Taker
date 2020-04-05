var express = require('express');

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());