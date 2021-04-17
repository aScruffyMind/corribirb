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

function mongo(state) {
    if (state === 'connect') {
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
    } else if (state === 'close') {
        mongoose.connection.close();
    }
}

const feedingSchema = new Schema({
    timestamp: Date,
    mls: Number
});

const weightSchema = new Schema({
    date: Date,
    weight: Number
});

const Feeding = mongoose.model('Feeding', feedingSchema);
const Weight = mongoose.model('Weight', feedingSchema);

/********** ROUTES **********/
app.get('/favicon.ico', function (req, res) {
    console.log('Caught another favicon.ico!');
});

app.get('/', function (req, res) {
    res.render('home');
});

app.route('/feeding')
    .get(function (req, res) {
        res.render('feeding');
    })
    .post(function (req, res) {
        mongo('connect');
        const timestamp = new Date();
        const mls = req.body.finaltotal;
        const feeding = new Feeding({
            mls: mls,
            timestamp: timestamp,
        });   
        const title = 'Feeding Entry Saved';
        const message = `${mls}&nbsp;mls logged at <span id="timestamp">[timestamp]</span>.`;
        feeding.save((err) => {
            if (!err) {
                mongoose.connection.close();
                res.render('success', {
                    title: title,
                    message: message,
                    timestamp: timestamp
                });
            } else res.send('There was an error in saving to the database. Please use the back button and try again.');
        });
    });

app.get('/weight', function (req, res) {
    res.render('weight');
});

app.get('/stats', function (req, res) {
    res.render('stats');
});

app.get('/success', function (req, res) {
    res.render('success');
})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3821;
}

app.listen(port, function () {
    console.log("Server started on port " + port);
});