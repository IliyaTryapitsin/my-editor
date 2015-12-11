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
