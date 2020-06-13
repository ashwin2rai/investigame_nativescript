const connectivityModule = require("tns-core-modules/connectivity");
var myFrame

exports.loaded = function (args) {
    var page = args.object;
    page.actionBarHidden = true;
    myFrame = page.frame;
};

exports.changetoselect = function () {
    if (connectivityModule.getConnectionType() == connectivityModule.connectionType.none) {
        myFrame.navigate({
            moduleName: "views/select/select-screen",
            animated: true,
            transition: {
                name: "slide"
            }
        });
    }
    else {
        myFrame.navigate({
            moduleName: "views/gamesel/gamesel-page",
            animated: true,
            transition: {
                name: "slide"
            }
        });
    }
};




