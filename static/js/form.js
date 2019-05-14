var golfers = [];
var list = [];
var sampleObj = {};
var tournament = "US PGA CHAMPIONSHIP";

$.getJSON('https://golf.jacoduplessis.co.za/?format=json', function (data) {

    for (x = 0; x < data.Leaderboards.length; x++) {
        if (data.Leaderboards[x].Tournament == tournament) {
            golfers = data.Leaderboards[0].Players.map(function (item) {
                return item.Name;
            });
        }
    }

    var selectBoxOne = document.getElementById('entryOne');

    for (var i = 0, l = golfers.length; i < l; i++) {
        var option = golfers[i];
        selectBoxOne.options.add(new Option(option));
    }

    var selectBoxTwo = document.getElementById('entryTwo');

    for (var i = 0, l = golfers.length; i < l; i++) {
        var option = golfers[i];
        selectBoxTwo.options.add(new Option(option));
    }

    var selectBoxThree = document.getElementById('entryThree');

    for (var i = 0, l = golfers.length; i < l; i++) {
        var option = golfers[i];
        selectBoxThree.options.add(new Option(option));
    }



    for (x = 0; x < data.Leaderboards.length; x++) {
        if (data.Leaderboards[x].Tournament == tournament) {
            list = data.Leaderboards[0].Players.map(function (item) {
                return item.Name;
            });
        }
    }

    console.log(list);
    

    for (var s = 0; x < 200; s++){
        var randomOne = list[Math.floor(Math.random()*list.length)];
        sampleObj.selections = randomOne;
    }

    console.log(sampleObj);
});