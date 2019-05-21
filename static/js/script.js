$("#refresh").click(function () {
    $(this).toggleClass("down");
    window.location.reload();
});

var scores = [];
var cut = 6;
var cutScore = 145;
var currentTour = "PGA Tour";
var withdrawn = ["Brian Gay","Conor Walsh"];
var newObj = {};

var pickOneScore, pickOnePosition, pickOneAfter, pickOneToday,
    pickTwoScore, pickTwoPosition, pickTwoAfter, pickTwoToday,
    pickThreeScore, pickThreePosition, pickThreeAfter, pickThreeToday;


$.getJSON("static/data/entries.json", function (picks) {

    $.getJSON('static/data/pga-scores.json', function (data) {
        var totalScore;
        // console.log(data.Leaderboards[1].Tournament);

        function getScores(name, short, pickOne, pickTwo, pickThree) {
            for (x = 0; x < data.Leaderboards.length; x++) {
                if (data.Leaderboards[x].Tour == currentTour) {
                    for (a = 0; a < data.Leaderboards[x].Players.length; a++) {

                    
                        if (data.Leaderboards[x].Players[a].Name === pickOne) {
                            if (data.Leaderboards[x].Players[a].Rounds[0] + data.Leaderboards[x].Players[a].Rounds[1] >= cutScore) {
                                pickOneScore = data.Leaderboards[x].Players[a].Total;
                                pickOnePosition = "CUT";
                                pickOneAfter = "-";
                                pickOneToday = "-";
                            } else {
                                pickOneScore = data.Leaderboards[x].Players[a].Total;
                                pickOnePosition = data.Leaderboards[x].Players[a].CurrentPosition;
                                pickOneAfter = data.Leaderboards[x].Players[a].After;
                                pickOneToday = data.Leaderboards[x].Players[a].Today;
                            }

                        }

                        if (data.Leaderboards[x].Players[a].Name === pickTwo) {
                            if (data.Leaderboards[x].Players[a].Rounds[0] + data.Leaderboards[x].Players[a].Rounds[1] >= cutScore) {
                                pickTwoScore = data.Leaderboards[x].Players[a].Total
                                pickTwoPosition = "CUT";
                                pickTwoAfter = "-";
                                pickTwoToday = "-";
                            } else {
                                pickTwoScore = data.Leaderboards[x].Players[a].Total;
                                pickTwoPosition = data.Leaderboards[x].Players[a].CurrentPosition;
                                pickTwoAfter = data.Leaderboards[x].Players[a].After;
                                pickTwoToday = data.Leaderboards[x].Players[a].Today;
                            }


                        }

                        if (data.Leaderboards[x].Players[a].Name === pickThree) {
                            if (data.Leaderboards[x].Players[a].Rounds[0] + data.Leaderboards[x].Players[a].Rounds[1] >= cutScore) {
                                pickThreeScore = data.Leaderboards[x].Players[a].Total
                                pickThreePosition = "CUT";
                                pickThreeAfter = "-";
                                pickThreeToday = "-";
                            } else {
                                pickThreeScore = data.Leaderboards[x].Players[a].Total;
                                pickThreePosition = data.Leaderboards[x].Players[a].CurrentPosition;
                                pickThreeAfter = data.Leaderboards[x].Players[a].After;
                                pickThreeToday = data.Leaderboards[x].Players[a].Today;
                            }

                        }

                       

                    }
                }
            }

            totalScore = pickOneScore + pickTwoScore + pickThreeScore;
            var totalScoreInt = parseInt(totalScore);
            var obj = [];
            obj["name"] = name;
            obj["short"] = short;
            obj["pickOne"] = pickOne;
            obj["pickOneScore"] = pickOneScore;
            obj["pickOnePosition"] = pickOnePosition;
            obj["pickOneAfter"] = pickOneAfter;
            obj["pickOneToday"] = pickOneToday;
            obj["pickTwo"] = pickTwo;
            obj["pickTwoScore"] = pickTwoScore;
            obj["pickTwoPosition"] = pickTwoPosition;
            obj["pickTwoAfter"] = pickTwoAfter;
            obj["pickTwoToday"] = pickTwoToday;
            obj["pickThree"] = pickThree;
            obj["pickThreeScore"] = pickThreeScore;
            obj["pickThreePosition"] = pickThreePosition;
            obj["pickThreeAfter"] = pickThreeAfter;
            obj["pickThreeToday"] = pickThreeToday;
            obj["score"] = totalScoreInt;
            scores.push(obj);
        }
        for (i = 0; i < picks.length; i++) {
            getScores(picks[i].name, picks[i].short, picks[i].selections[0], picks[i].selections[1], picks[i].selections[2]);

            
                    }



        for (i = 0; i < scores.length; i++) {

            if (isNaN(scores[i].score)) {
                scores[i].score = "-";
            }



            $("#scoreboard-row").append(
                `
                <tr data-toggle="modal" data-target="#${scores[i].short}-Modal" >
                    <td class="entry">${scores[i].name}</td>
                    <td class="entry">${scores[i].score}</td>
                    <td class="entry d-none d-md-table-cell">${scores[i].pickOne} (${scores[i].pickOneScore})</td>
                    <td class="entry d-none d-md-table-cell">${scores[i].pickTwo} (${scores[i].pickTwoScore})</td>
                    <td class="entry d-none d-md-table-cell">${scores[i].pickThree} (${scores[i].pickThreeScore})</td>
                </tr>
                
            
            `

            );

            $("#modals").append(
                `<div id="${scores[i].short}-Modal" class="modal fade" role="dialog">
              <div class="modal-dialog">
            
                <!-- Modal content-->
                <div class="modal-content">
                 
                  <div class="modal-body">
                  <div class="table-responsive">
                  <table class="table indTable">
                  <thead class="table-header">   
                  <tr>
                  <th colspan="5">
                  <h5 class = "modal-name align-middle"><img src="static/img/pga-logo-40px.png" class="align-middle">  ${scores[i].name}</h5>
                  </th>
                  </tr>  
                  <tr>
                            <th>Position</th>
                            <th>Selections</th>
                            <th>Today</th>
                            <th>Thru</th>
                            <th data-sort="int" data-sort-onload=yes>Total</th>
                    </tr>
                </thead>
                        <tbody class="table-body">
                        <tr>
                            <td>${scores[i].pickOnePosition}</td>
                            <td>${scores[i].pickOne}</td>
                            <td>${scores[i].pickOneToday}</td>
                            <td>${scores[i].pickOneAfter}</td>
                            <td>${scores[i].pickOneScore}</td>
                        </tr>
                        <tr>
                            <td>${scores[i].pickTwoPosition}</td>
                            <td>${scores[i].pickTwo}</td>
                            <td>${scores[i].pickTwoToday}</td>
                            <td>${scores[i].pickTwoAfter}</td>
                            <td>${scores[i].pickTwoScore}</td>
                        </tr>
                        <tr>
                            <td>${scores[i].pickThreePosition}</td>
                            <td>${scores[i].pickThree}</td>
                            <td>${scores[i].pickThreeToday}</td>
                            <td>${scores[i].pickThreeAfter}</td>
                            <td>${scores[i].pickThreeScore}</td>
                        </tr>
                        </tbody>
                        </table>
                        </div>
                    
                  </div>
                  <div class="modal-footer">
                
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
            
              </div>
            </div>
            
            `
            )



        }


        $("#scoreboard").stupidtable();
        $(".indTable").stupidtable();



    });
});

$(window).on('load', function () {
    $("#cover").fadeOut(3000);
});