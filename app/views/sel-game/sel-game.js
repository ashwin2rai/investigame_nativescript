const view = require("ui/core/view");
const utilsModule = require("tns-core-modules/utils/utils");
const connectivityModule = require("tns-core-modules/connectivity");

var sfinit = require("../shared/view-models/searchfilter");
const titleArray = require("../gamesel/gamesel-page").titles;

var drawer
var myFrame
var filterlist = new sfinit(titleArray)

exports.loaded = function (args) {
    var page = args.object;
    page.actionBarHidden = true;
    myFrame = page.frame
    drawer = view.getViewById(page, "sideDrawer");
    
    //this allows a filtered listview
    page.bindingContext = filterlist;
};

exports.onItemTap = function (args) {
    //title of game that was tapped
    const gameTitle = args.object._getDataItem(args.index).title;

    function findIndexGame(arg) {
        return arg.title == gameTitle
    }

    //find real index of game
    //this is needed because filtered listview will return
    //current index based on search term
    exports.gameIdx = titleArray.findIndex(findIndexGame);

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
            moduleName: "views/Gamedets/gamedets-page",
            animated: true,
            transition: {
                name: "slide"
            }
        });
    }
}

exports.toggleDrawer = function () {
    drawer.toggleDrawerState();
};

exports.linkedinTouch = function () {
    utilsModule.openUrl("https://www.linkedin.com/in/ashwin2rai/")
};

exports.githubTouch = function () {
    utilsModule.openUrl("https://github.com/ashwin2rai")
};

exports.scholarTouch = function () {
    utilsModule.openUrl("https://scholar.google.com/citations?user=eqS0zH8AAAAJ&hl=en&oi=ao")
};

exports.webappTouch = function () {
    utilsModule.openUrl("http://processwith.me")
};
