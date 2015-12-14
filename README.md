#my-editor

WYSIWYG edit for AngularJS

Install from npm repository

```
npm install my-editor
```

[Demo](http://itryapitsin.github.io/my-editor/)


Add links to scrips

```
<script src="js/my-editor-tpl.js"></script>
<script src="js/my-editor.js"></script>
```

Add modules to your AngularJS application

```
angular.module('my-editor-example-app', ['my-editor', 'my-editor-tpl', ...])
```

Add my-editor tag to you HTML page

```
<my-editor data-ng-model="text"></my-editor>
```

Check result :)