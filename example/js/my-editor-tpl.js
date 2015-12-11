(function(module) {
try { module = angular.module("my-editor-tpl"); }
catch(err) { module = angular.module("my-editor-tpl", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("tpl/my-editor-menu.html",
    "<div class=\"menu\">\n" +
    "    <div class=\"btn-group menu-group\" data-ng-repeat=\"group in options.menus\" role=\"group\">\n" +
    "        <button type=\"button\"\n" +
    "                data-ng-repeat=\"item in group\"\n" +
    "                class=\"btn btn-default\"\n" +
    "                data-ng-if=\"options.commands[item].type == 'button'\"\n" +
    "                data-ng-click=\"exec(options.commands[item].command)\"\n" +
    "                data-ng-class=\"{ active: states[options.commands[item].command] }\"\n" +
    "                unselectable=\"on\">\n" +
    "            <span>{{options.commands[item].title}}</span>\n" +
    "            <i class=\"{{options.commands[item].icon}}\"></i>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("my-editor-tpl"); }
catch(err) { module = angular.module("my-editor-tpl", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("tpl/my-editor.html",
    "<div id=\"{{options.id}}\" class=\"{{options.class}} my-editor\">\n" +
    "    <my-editor-menu></my-editor-menu>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-12\"  data-ng-hide=\"!options.showDesign\">\n" +
    "            <div id=\"my-editor-markup\" role=\"tabpanel\" class=\"tab-pane content\" contenteditable=\"true\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
})();
