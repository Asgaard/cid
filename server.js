var express = require('express');
var jobsData = require('./jobs-data.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname);

app.use(express.static(__dirname + '/public'));

app.get('/api/jobs', function (req, res) {
    jobsData.findJobs().then(function (collection) {
        res.send(collection);
    });
});

app.get('*', function (req, res) {
    res.render('index');
});

jobsData.connectDB("mongodb://localhost/cid")
    .then(function () {
        console.log('connected to mongodb successfully');
        jobsData.seedJobs();
    });

app.listen(3030);