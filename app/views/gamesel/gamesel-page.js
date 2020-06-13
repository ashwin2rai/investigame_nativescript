const view = require("ui/core/view");
const utilsModule = require("tns-core-modules/utils/utils");
const connectivityModule = require("tns-core-modules/connectivity");
const observableModule = require("tns-core-modules/data/observable");

const urlVal = require("../shared/config/url").url;

const dbURL = `${urlVal}/Titles/.json`
let isLoading = false
let titles = []
var myFrame
var drawer

var viewModel = new observableModule.fromObject({
    isLoading: isLoading
})

exports.loaded = function (args) {
    isLoading = false
    var page = args.object;
    page.actionBarHidden = true;
    myFrame = page.frame;
    drawer = view.getViewById(page, "sideDrawer");

    page.bindingContext = viewModel;
};

exports.changetoselgame = function () {
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
        //example of async/await Fetch
        async function fetchAsync() {
            let data = await (await fetch(dbURL)).json();
            function pushdata(item, index) {
                titles.push({ 'title': item })
            }
            //Take data array and populate title array
            // title array is made of object elements
            data.forEach(pushdata);
        }

        viewModel.set("isLoading", true)
        fetchAsync().then(function () {
            //titles array will be used in the next screen
            //hence it will be exported
            exports.titles = titles;
            viewModel.set("isLoading", false)

            myFrame.navigate({
                moduleName: "views/sel-game/sel-game",
                animated: true,
                transition: {
                    name: "slide"
                }
            });
        });
    }
};

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

