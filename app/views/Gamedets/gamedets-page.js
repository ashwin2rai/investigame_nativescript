const connectivityModule = require("tns-core-modules/connectivity");
const observableModule = require("tns-core-modules/data/observable");

const bindvar = ["imsrc", "title", "pub", "dev", "rev", "pred", "prob"]
var myFrame

exports.loaded = function (args) {
    //the gameindex and urls need to be reloaded each time
    //this is because it needs to be refreshed each time
    //user enters this screen
    const gameIdx = require("../sel-game/sel-game").gameIdx;
    const urlVal = require("../shared/config/url").url;
    const dbUrl = [
        `${urlVal}/GameCard/${gameIdx}.json`,
        `${urlVal}/Titles/${gameIdx}.json`,
        `${urlVal}/Publishers/${gameIdx}.json`,
        `${urlVal}/Developers/${gameIdx}.json`,
        `${urlVal}/Reviews/${gameIdx}.json`,
        `${urlVal}/SuccessPredictText/${gameIdx}.json`,
        `${urlVal}/SuccessPredictProb/${gameIdx}.json`
    ]

    var page = args.object;
    page.actionBarHidden = true;
    myFrame = page.frame;

    var gamesel = new observableModule.fromObject({
        imsrc: "",
        title: "title",
        pub: "pub",
        dev: "dev",
        rev: 10,
        pred: "Pred",
        prob: 50
    })

    //function fetches and sets each time needed to be displayed
    function updateFun(item, index) {
        //example of non async Fetch
        //using big fat arrow syntax
        fetch(item)
            .then((response) => response.json())
            .then((res) => {
                gamesel.set(bindvar[index], res);
                //Confidence value needs to be formatted
                //with two only two decimals
                if (bindvar[index] == "prob") {
                    gamesel.set(bindvar[index], Number(res * 100).toFixed(2));
                }
            });
    }
    dbUrl.forEach(updateFun)
    
    page.bindingContext = gamesel;
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

    } else {
        myFrame.navigate({
            moduleName: "views/sel-game/sel-game",
            animated: true,
            transition: {
                name: "slide"
            }
        });
    }
};


