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
    timestamp: Date,
    weight: Number
});

const Feeding = mongoose.model('Feeding', feedingSchema);
const Weight = mongoose.model('Weight', weightSchema);

/********** ROUTES **********/
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
                mongo('close');
                res.render('success', {
                    title: title,
                    message: message,
                    timestamp: timestamp
                });
            } else res.send('There was an error in saving to the database. Please use the back button and try again.');
        });
    });

app.route('/weight')
    .get(function (req, res) {
        res.render('weight');
    })
    .post(function (req, res) {
        mongo('connect');
        const timestamp = new Date();
        const grams = Number(req.body.weight);
        const weight = new Weight({
            weight: grams,
            timestamp: timestamp
        });
        const title = 'Weight Saved';
        const message = `Weight of ${grams} g logged at <span id="timestamp">[timestamp]</span>.`;
        weight.save((err) => {
            if (!err) {
                mongo('close');
                res.render('success', {
                    title: title,
                    message: message,
                    timestamp: timestamp
                });
            } else res.send('There was an error in saving to the database. Please use the back button and try again.');
        });
    });

app.get('/stats', function (req, res) {
    mongo('connect')
    Feeding.find({}, function (err, foundFeedings) {
        Weight.find({}, function (err, foundWeights) {
            mongo('close');
            res.render('stats', {
                feedingData: foundFeedings,
                weightData: foundWeights
            });
        });
    });
});

app.get('/success', function (req, res) {
    res.render('success');
});

app.get('/favicon.ico', function (req, res) {
    console.log('Caught another favicon.ico!');
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3822;
}

app.listen(port, function () {
    console.log("Server started on port " + port);
});