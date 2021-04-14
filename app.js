require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();
const Schema = mongoose.Schema;
app.set('view engine', 'ejs');

const mongoUrl = process.env.HOST; // use dotenv

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect(mongoUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const feedingSchema = new Schema({
    date: Date,
    mls: Number
});

const weightSchema = new Schema({
    date: Date,
    mls: Number
});

const feeding = mongoose.model('Feeding', feedingSchema);
const weight = mongoose.model('Weight', feedingSchema);

console.log('so far so good!');

app.get('/favicon.ico', function (req, res) {
    console.log('Caught another favicon.ico!');
});

app.get('/', function(req, res) {
    res.render('home');
});