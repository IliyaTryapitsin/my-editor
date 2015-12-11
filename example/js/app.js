angular
    .module('my-editor-example-app', ['my-editor', 'my-editor-tpl', 'hljs'])
    .controller('MainCtrl', ['$scope', '$sce', function ($scope, $sce) {
        $scope.text = "some text";
        $scope.sce = $sce;
        $scope.options = {
            showCode: true
        };

        function escapeHtml (str) {

            var entityMap = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': '&quot;',
                "'": '&#39;',
                "/": '&#x2F;'
            };

            return String (str).replace(/[&<>"'\/]/g, function (s) {
                return entityMap[s];
            });

        }

        $scope.$watch('text', function () {
            console.log($scope.text);
            $scope.escapedText = escapeHtml($scope.text);
            //hljs.initHighlightingOnLoad();
        });


    }]);