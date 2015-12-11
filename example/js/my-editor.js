var commands = {
    bold: {
        command: 'bold',
        type: 'button',
        title: 'Bold',
        icon: 'glyphicon glyphicon-bold',
        arg: false
    },
    italic: {
        command: 'italic',
        type: 'button',
        title: 'Italic',
        icon: 'glyphicon glyphicon-italic',
        arg: false
    },
    underline: {
        command: 'underline',
        type: 'button',
        title: 'Underline',
        icon: 'underline',
        arg: false
    },
    strikethrough: {
        command: 'strikethrough',
        type: 'button',
        title: 'Strikethrough',
        icon: 'strikethrough',
        arg: false
    },
    justifyleft: {
        command: 'justifyleft',
        type: 'button',
        title: 'Left justify',
        icon: 'glyphicon glyphicon-align-left',
        arg: false
    },
    justifycenter: {
        command: 'justifycenter',
        type: 'button',
        title: 'Center justify',
        icon: 'glyphicon glyphicon-align-center',
        arg: false
    },
    justifyright: {
        command: 'justifyright',
        type: 'button',
        title: 'Right justify',
        icon: 'glyphicon glyphicon-align-right',
        arg: false
    },
    insertunorderedlist: {
        command: 'insertunorderedlist',
        type: 'button',
        title: 'Unordered list',
        icon: 'glyphicon glyphicon-align-justify',
        arg: false
    },
    insertorderedlist: {
        command: 'insertorderedlist',
        type: 'button',
        title: 'Ordered list',
        icon: 'glyphicon glyphicon-list',
        arg: false
    },
    indent: {
        command: 'indent',
        type: 'button',
        title: 'Indent',
        icon: 'glyphicon glyphicon-indent-left',
        arg: false
    },
    outdent: {
        command: 'outdent',
        type: 'button',
        title: 'Outdent',
        icon: 'glyphicon glyphicon-indent-right',
        arg: false
    },
    removeformat: {
        command: 'removeformat',
        type: 'button',
        title: 'Remove format',
        icon: 'glyphicon glyphicon-font',
        arg: false
    },
    fontsize: {
        command: 'fontsize',
        type: 'button',
        title: 'Font size',
        icon: 'glyphicon glyphicon-text-size',
        arg: true,
        promptTitle: 'Enter the number of 1-7',
        defaultValue: 3,
        filter: function (value) {
            value = value ? parseInt (value) : false;
            if (!(value >= 1 && value <= 7)) {
                value = 2;
            }
            return value;
        }
    },
    createlink: {
        command: 'createlink',
        type: 'button',
        title: 'Create link',
        icon: 'link',
        arg: true,
        promptTitle: 'Enter the link url',
        defaultValue: 'http://',
        filter: function (value) {
            return value;
        }
    },
    insertimage: {
        command: 'insertimage',
        type: 'button',
        title: 'Insert image',
        icon: 'image',
        arg: true,
        promptTitle: 'Enter the image url',
        defaultValue: 'http://',
        filter: function (value) {
            return value;
        }
    }
};
var defaultMenus = [
    ['bold', 'italic', 'underline', 'strikethrough'],
    ['fontsize'],
    ['justifyleft', 'justifycenter', 'justifyright'],
    ['insertunorderedlist', 'insertorderedlist'],
    ['indent', 'outdent'],
    ['removeformat', 'createlink', 'insertimage']
];

angular
    .module('my-editor', [])
    .directive('myEditor', myEditor)
    .directive('myEditorMenu', myEditorMenu);

function myEditorMenu () {
    return {
        templateUrl: function (element, attrs) {
            return attrs.templateUrl || "tpl/my-editor-menu.html"
        },

        restrict: 'E',
        scope: '=scope',
        replace: true,

        link: function ($scope, $element, $attrs, $ctrl) {

        }
    };
}

myEditorMenu.$inject = [];

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
