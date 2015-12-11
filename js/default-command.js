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