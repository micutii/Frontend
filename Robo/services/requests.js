myApp.factory("requests", ["$q", "$http", "$cookies", function ($q, $http, $cookies) {
    var url = 'http://10.0.0.76:8080';
    var isLogged = false;
    var cookie = '';
    return {
        pins: function () {
            var deferred = $q.defer();

            var req = {
                method: 'GET',
                url: url + '/api/pins/get',
                withCredentials: isLogged,
                headers: {
                    'Set-Cookie': cookie
                }
            }

            console.log(req);

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
        types: function () {
            var deferred = $q.defer();
            $http.get(url + '/api/types/get').then(function (data) {
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
                withCredentials: false,
                headers: {
                    'Authorization': make_base_auth(loginForm.email, loginForm.password)
                }
            }

            $http(req).then(function (data) {
                console.log(data);
                if (data.status == 200) {
                    isLogged = true;
                    console.log($cookies.getAll());
                    cookie = 'JSESSIONID='+$cookies.get('JSESSIONID');
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
                withCredentials: false,
            }

            $http(req).then(function (data) {
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(data);
            });
            return deferred.promise;
        }
    }
}]);