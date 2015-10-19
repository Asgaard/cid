var mongoose = require("mongoose");
var Promise = require("bluebird");
require("./models/job"); // Needed for generating model

var Job = mongoose.model("Job");


var jobs =  [
    {title: 'Cook', description: 'You will be making bagels'},
    {title: 'Waiter', description: 'You will be putting food on peoples tables'},
    {title: 'Programmer', description: 'You will be mindlessly typing for hours'},
    {title: 'Axe Maker', description: 'We need many axes made ... so many..'}
];

var findJobs = function(query) {
    return Promise.cast(Job.find(query).exec());
};
var createJob = Promise.promisify(Job.create, Job);

exports.connectDB = Promise.promisify(mongoose.connect, mongoose);
exports.findJobs = findJobs;
exports.seedJobs = function() {
    return findJobs({}).then(function (collection) {
        if (collection.length === 0) {
            return Promise.map(jobs, function(job) {
                return createJob(job);
            });
        }
    });
};
