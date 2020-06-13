var myFrame

exports.loaded = function (args) {
    var page = args.object;
    page.actionBarHidden = true;
    myFrame = page.frame
};

exports.changetohome = function () {
    myFrame.navigate({
        moduleName: "views/home/home-page",
        animated: true,
        transition: {
            name: "slideRight"
        }
    });
};


