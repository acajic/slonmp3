/**
 * Created by Andro on 30.7.2015..
 */

app.controller('HomeController',function ($scope, $http) {
    "use strict";

    $scope.keypressFunction = function(event) {
        if (event.charCode == 13) {
            $scope.search();
        }
    };

    $scope.search = function() {
        reset();

        if ($scope.query.length == 0) return;

        var youtubeAPIReq = $http.get('https://www.googleapis.com/youtube/v3/search?key=AIzaSyCuFgQ5DK0TKGpCNdlmsZweSpXWtXTc_nU&part=snippet&q='+$scope.query);

        youtubeAPIReq.success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available

            if (data.items.length > 0) {
                var firstItem = data.items[0];
                var videoId = firstItem.id.videoId;
                download(videoId);
            }

        }).error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.

            $scope.googleProblem = true;
        });
    };

    function ytMP3(titleVal) { top.location.href = "http://www.video2mp3.at/dl/" + titleVal + "/mp3/"; }
    function ytMP4(titleVal) { top.location.href = "http://www.video2mp3.at/dl/" + titleVal + "/mp4/"; }

    function download(videoId) {

        ytMP3(videoId);
        //      window.location =  'http://youtubeinmp3.com/fetch/?video=http://www.youtube.com/watch?v=' + videoId;
    }

    function reset() {
        $scope.googleProblem = false;
    }

    reset();
});