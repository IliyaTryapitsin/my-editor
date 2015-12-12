angular
    .module('my-editor-example-app', ['my-editor', 'my-editor-tpl', 'hljs'])
    .controller('MainCtrl', ['$scope', '$sce', function ($scope, $sce) {
        $scope.text =
            "<p>This automatic page generator is the easiest way to create " +
            "beautiful pages for all of your projects. Author your page " +
            "content here <a href=\"https://guides.github.com/features/mastering-markdown/\">" +
            "using GitHub Flavored Markdown</a>, select a template crafted " +
            "by a designer, and publish. After your page is generated, " +
            "you can check out the new <code>gh-pages</code> branch locally. " +
            "If you’re using GitHub Desktop, simply sync your repository " +
            "and you’ll see the new branch.</p>";

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