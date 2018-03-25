myApp.factory("requests", ["$q", "$http", function ($q, $http) {
    var url = 'http://10.0.0.76:8080';
    var isLogged = false;
    return {
        pins: function () {
            var deferred = $q.defer();
            var req = {
                method: 'GET',
                url: url + '/api/pins/getValid',
                withCredentials: true
            }

            $http(req).then(function (data) {
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        allPins: function () {
            var deferred = $q.defer();
            var req = {
                method: 'GET',
                url: url + '/api/pins/get',
                withCredentials: true
            }

            $http(req).then(function (data) {
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        addPin: function (pin) {
            var deferred = $q.defer();
            $http.post(url + '/api/pins/create', pin).then(function (data) {
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        editPin: function (pin) {
            var deferred = $q.defer();
            $http.post(url + '/api/pins/create', pin).then(function (data) {
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        deletePin: function (pinId) {
            var deferred = $q.defer();
            $http.delete(url + '/api/pins/delete/' + pinId).then(function (data) {
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        types: function () {
            var deferred = $q.defer();

            var req = {
                method: 'GET',
                url: url + '/api/types/get',
                withCredentials: true
            }

            $http(req).then(function (data) {
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },

        login: function (loginForm) {
            var deferred = $q.defer();
            function make_base_auth(user, password) {
                var tok = user + ':' + password;
                var hash = btoa(tok);
                return "Basic " + hash;
            }

            var req = {
                method: 'GET',
                url: url + '/api/login',
                withCredentials: true,
                headers: {
                    'Authorization': make_base_auth(loginForm.email, loginForm.password)
                }
            }

            $http(req).then(function (data) {
                if (data.status == 200) {
                    isLogged = true;
                }
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },

        signup: function (registerForm) {
            var deferred = $q.defer();

            var req = {
                method: 'GET',
                url: url + '/api/signup',
                withCredentials: true,
            }

            $http(req).then(function (data) {
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        logout: function () {
            var deferred = $q.defer();

            var req = {
                method: 'GET',
                url: url + '/api/logout',
                withCredentials: true,
            }

            $http(req).then(function (data) {
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },

    }
}]);