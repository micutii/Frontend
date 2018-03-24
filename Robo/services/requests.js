myApp.factory("requests", function ($q, $http) {
    var url = 'http://10.0.0.76:8080';
    return {
        pins: function () {
            var deferred = $q.defer();
            $http.get(url + '/api/pins/getValid').then(function (data) {
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        types: function () {
            var deferred = $q.defer();
            $http.get(url + '/api/types/get').then(function (data) {
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(data);
            });
            return deferred.promise;
        }
    }
});