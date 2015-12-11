function myEditor ($timeout, $q, $sce) {
    return {
        templateUrl: function (element, attrs) {
            return attrs.templateUrl || "tpl/my-editor.html"
        },
        scope: {
            value: '=ngModel',
            options: '=options'
        },
        restrict: 'E',
        require: 'ngModel',
        replace: true,

        link: function ($scope, $element, $attrs, $ctrl) {
            var defaultOptions = {
                menus: defaultMenus,
                commands: commands,
                title: {
                    markup: 'Design',
                    code: 'HTML'
                },
                showDesign: true
            };

            if (angular.isDefined($scope.$parent.options) || angular.isObject($scope.$parent.options)) {
                angular.extend(defaultOptions, $scope.$parent.options);
            }

            $scope.options = defaultOptions;

            $scope.$parent.toggleDesign = function () {
                $scope.options.showDesign = !$scope.options.showDesign;
            };

            var editor = $element[0].querySelector('#my-editor-markup');
            var code = $element[0].querySelector('#my-editor-code');

            $ (editor).bind('DOMSubtreeModified', function (event) {
                var innerHtml = $ (editor).html();

                if (innerHtml != $ctrl.$viewValue) {
                    $ctrl.$setViewValue($ (editor).html());
                }
            });

            $ctrl.$render = function () {
                if (editor)
                    editor.innerHTML = $ctrl.$viewValue;
            };

            function getCommandState (command) {
                return document.queryCommandState(command);
            }

            function getCommandValue (command) {
                return document.queryCommandValue(command);
            }

            function isTag (tag) {
                var selection = window.getSelection().getRangeAt(0);
                if (selection) return (
                    selection.startContainer.parentNode.tagName === tag.toUpperCase() ||
                    selection.endContainer.parentNode.tagName === tag.toUpperCase()
                );
                else return false;
            }

            $scope.states = {};

            var refreshing = false;

            function refreshState () {
                if (refreshing)
                    return;

                refreshing = true;
                angular.forEach($scope.options.commands, function (commandObj, command) {
                    if (commandObj.arg) {
                        var value = getCommandValue (command);
                        if (command == 'createlink') {
                            value = isTag ('a');
                        }

                        if (value) {
                            $scope.states[command] = value;
                        } else {
                            delete $scope.states[command];
                        }
                    } else {
                        var state = getCommandState (command);
                        if (state) {
                            $scope.states[command] = state;
                        } else {
                            delete $scope.states[command];
                        }
                    }
                });
                refreshing = false;
            }

            $scope.exec = function (command) {
                var commandObj = commands[command];
                if (commandObj.arg) {
                    //$timeout (function () {
                        var defaultValue = getCommandValue (command);
                        if (!defaultValue) {
                            defaultValue = commandObj.defaultValue;
                        }

                        var value = prompt (commandObj.promptTitle, defaultValue);
                        if (value && value.length > 0) {
                            value = commandObj.filter(value);
                            document.execCommand(command, false, value);
                            refreshState ();
                        }
                    //});
                } else {
                    document.execCommand(command, false, null);
                    refreshState ();
                }
            };
        }
    };
}

myEditor.$inject = ['$timeout', '$q', '$sce'];
