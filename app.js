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
})
.then(() => {
    console.log('connected to db!');
    
})
.catch((err) => {
    console.log('something is wrong with db connection');
    
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

app.get('/feeding', function(req, res) {
    res.render('feeding');
});

app.get('/weight', function (req, res) {
    res.render('weight');
});

app.get('/stats', function (req, res) {
    res.render('stats');
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3821;
}

app.listen(port, function () {
    console.log("Server started on port " + port);
});