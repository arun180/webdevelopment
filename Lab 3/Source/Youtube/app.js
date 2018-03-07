var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider,$httpProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'login.html',
            controller: 'loginController'
        })
        .when('/register', {
            templateUrl: 'register.html',
            controller: 'registerController'
        })
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'homeController'
        });

});

myApp.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://www.youtube.com/**'
    ]);
});



myApp.controller('homeController', function($scope,$http,$sce) {
    $scope.pageClass = 'home';
    $scope.videoIdList = new Array();
    $scope.searchVideo =function () {
        var search=document.getElementById("searchKey").value;
        var speakup = "Searching top 5 trending video in web for "+search;
        // console.log(speakup);
        var msg = new SpeechSynthesisUtterance(speakup);
        // window.speechSynthesis.speak(msg);
        var request = gapi.client.youtube.search.list({
            part: 'snippet',
            type: 'video',
            q: search
        });
        var vid;
        var YTurl1;

        var response=$http.get("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q="+search+"&type=video&key=AIzaSyD_d_XWDzXLeHfv9vPSDzaIZMQaas_olsw");
        response.success(function (data) {
            console.log("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q="+search+"&type=video&key=AIzaSyD_d_XWDzXLeHfv9vPSDzaIZMQaas_olsw")
            for (var i = 0; i < 5; i++) {
                var filter = data.items[i].id.videoId;
                $scope.videoIdList[i] = {
                    "vid": data.items[i].id.videoId,
                    "vurl": 'https://www.youtube.com/embed/'+filter
                };
            }

           /* var item = data.items[0].id.videoId;
            console.log(item);
            $scope.YTURL = $sce.trustAsResourceUrl('https://www.youtube.com/embed/'+item);*/
        });
        console.log(response);
    };
});
function init () {
    gapi.client.setApiKey("AIzaSyD_d_XWDzXLeHfv9vPSDzaIZMQaas_olsw");
    gapi.client.load('youtube', 'v3', function() {
        //
    });
};