app = angular.module('app',['ngResource']);

angular.module('app').controller('testCtrl', function($scope, $resource, jobs) {
    $scope.jobs = $resource('/api/jobs').query();

    $scope.submit = function() {
        var newJob = {title:$scope.title, description:$scope.description};
        $scope.jobs.push(newJob);
        jobs.save(newJob);
    }
});