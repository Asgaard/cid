var express = require('express');
var mongoose = require('mongoose');
var jobModel = require('./models/job.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname);

app.use(express.static(__dirname + '/public'));

app.get('/api/jobs', function(req,res) {
   mongoose.model('Job').find({}).exec(function(errror, collection) {
      res.send(collection);
   });
});

app.get('*', function(req,res) {
   res.render('index');
});

mongoose.connect("mongodb://localhost/cid");

var con = mongoose.connection;

con.once('open', function() {
   console.log('connected to mongodb successfully');
    jobModel.seedJobs();
});

app.listen(3030);