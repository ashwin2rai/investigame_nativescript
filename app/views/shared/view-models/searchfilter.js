const observableModule = require("tns-core-modules/data/observable");

function searchFilter(arr) {

    const temp = [
        { title: "Game 1" },
        { title: "Game 2" },
        { title: "Game 3" },
        { title: "Could not download games" }
    ]

    const myTitles = arr || temp;
    var sbText

    const viewModel = observableModule.fromObject({
        // Setting the listview binding source
        myTitles,
        sbText: ""
    });

    viewModel.on(observableModule.Observable.propertyChangeEvent, function (propertyChangeData) {
        if (propertyChangeData.propertyName === "sbText") {

            function refilter(arrval) {
                searchString = propertyChangeData.value.trim().toLowerCase()
                return arrval.title.trim().toLowerCase().includes(searchString)
            }

            if (viewModel.get("sbText") == "") {
                viewModel.set("myTitles", myTitles);
            }
            else {
                viewModel.set("myTitles", myTitles.filter(refilter));
            }

        }
    });

    return viewModel;
}

module.exports = searchFilter;
