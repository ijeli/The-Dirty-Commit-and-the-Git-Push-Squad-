
var queryURL = "https://worldcup.sfg.io/matches/today";

$.ajax({
    url: queryURL,
    method: "GET"
})
.then(function(response) {
    console.log(queryURL);
    console.log(response);
    var results = response

    for (var i = 0; i < results.length; i++) {
        //console.log(results[i]);
        //console.log(results[i].venue);
        console.log(results[0].winner_code);
        var tbody = $("tbody");
        var newRow = $(
            "<tr><td>" + results[i].home_team_country + "</td><td>"
            + results[i].away_team_country + "</td><td>" + 
            results[i].home_team.goals + " || " + results[i].away_team.goals
            + "</td><td>" + results[i].winner + "</td></tr>"
        );
        tbody.append(newRow);
    }

});

