myApp.factory("requests", ["$q", "$http", "$state", "$rootScope", function ($q, $http, $state, $rootScope) {
    var url = 'http://10.0.0.76:8080';
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
            $http.post(url + '/api/pins/create?user=' + $rootScope.username, pin).then(function (data) {
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
                    $rootScope.isLogged = true; 
                    $rootScope.username = loginForm.email;
                }
                deferred.resolve(data);
                $state.go('maps');
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },

        signup: function (registerForm) {
            var deferred = $q.defer();

            var req = {
                method: 'POST',
                url: url + '/api/signup',
                withCredentials: true,
                data: registerForm
            }

            $http(req).then(function (data) {
                if (data.status == 200)
                {
                    $state.go('login');
                }
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        isAdmin: function (user) {
            var deferred = $q.defer();

            var req = {
                method: 'GET',
                url: url + '/api/isAdmin?userName=' + user,
                withCredentials: true,
            }

            $http(req).then(function (data) {
                if (data.status == 200) {
                    console.log(data);
                }
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        getReviews: function () {
            var deferred = $q.defer();

            var req = {
                method: 'GET',
                url: url + '/api/isAdmin?userName=' + user,
                withCredentials: true,
            }

            $http(req).then(function (data) {
                if (data.status == 200) {
                    console.log(data);
                }
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
                url: url + '/logout',
                withCredentials: true,
            }

            $http(req).then(function (data) {
                if (data.status == 200)
                {
                    $state.go('maps');
                    $rootScope.isLogged = false;
                    $rootScope.username = ''; 
                }
                else if (data.status == 302)
                {
                    $rootScope.isLogged = false;
                    $rootScope.username = '';
                    location.href = 'index.html#!/maps';
                }
                deferred.resolve(data);
            }, function (err) {
                $rootScope.isLogged = false;
                $rootScope.username = '';
                location.href = 'index.html#!/maps';
                deferred.reject(err);
            });
            return deferred.promise;
        },

    }
}]);