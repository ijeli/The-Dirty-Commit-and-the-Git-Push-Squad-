    // CODE FOR AUSTRALIA BUTTON
    //$(".team-buttons").append("<button class='btn btn-primary' type='button' onclick='gotTeamName(\"" + teamName + "\")'>Australia</button>");
    // $(".team-buttons").append("<button class='btn btn-primary' type='button' onclick='gotTeamName()'>Australia</button>");

    // function gotTeamName(teamName) {	
    // var teamName = "AUS";
    //     //window.open('https://teampage.html?TeamName=' + encodeURIComponent(teamName))
    //     window.open('teampage.html?TeamName=' + encodeURIComponent(teamName))        
    //     // gotTeamName(results[i].country.Australia);
    //     // console.log(gotTeamName);
    // }	


    var funcs = [];

    function createfunc(i) {
        return function() { console.log("My value: " + i); };
    }
    
    for (var i = 0; i < 3; i++) {
        funcs[i] = createfunc(i);
        console.log("This is I");
        console.log(funcs[i]);                    // and now let's run each one to see


    }
    
    for (var j = 0; j < 3; j++) {
        funcs[j]();    
        console.log(funcs[j]);                    // and now let's run each one to see
    }

//Current Score
function loadScore() {
    var queryURL = "https://worldcup.sfg.io/matches/today";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        //console.log(queryURL);

        var results = response;
        console.log("Today's Score");
        console.log(results);
        if(results.length === 0) {
            var tbodyTM = $("#currentScore");
            var newRow = $(
                "<tr><td colspan='5' rowspan='5' style='font-size:2em;'>N/A</td></tr>"
            );
            tbodyTM.append(newRow);
        } else {
            for (var i = 0; i < results.length; i++) {
                //clear the table before loading data
                $(".scoreRow-" + [i]).remove();
                //console.log(results[i]);
                //console.log(results[i].venue);
                //console.log(results[0].winner_code);
                
                //Check for null fields
                if(results[i].winner === null){
                    results[i].winner = "Game Ongoing";
                }
                if(results[i].time === null){
                    results[i].time = "Game Ongoing";
                }
                var tbodyCS = $("#currentScore");
                var newRow = $(
                    "<tr class='scoreRow-" + [i] + "'><td>" + results[i].time +"</td><td>" + results[i].home_team_country + "</td><td>" + 
                    results[i].home_team.goals + " || " + results[i].away_team.goals
                    + "</td><td>" + results[i].away_team_country + "</td><td>" 
                    + results[i].winner + "</td></tr>"
                );
                tbodyCS.append(newRow);
            }
        }
    });

    //get tomorrow's games
    tomorrowsGames();
}

//Tomorrow's Games
function tomorrowsGames() {
    var queryURL2 = "https://worldcup.sfg.io/matches/tomorrow/?by_date=DESC";
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function(response) {
        //console.log(queryURL2);
        console.log('Tomorrows Matches');
        console.log(response);
        var results = response;
        console.log('results.length');
        console.log(results.length);

        //filling in null with n/a
        if(results.length === 0) {
            var tbodyTM = $("#tomorrows-matches");
            var newRow = $(
                "<tr><td colspan='3' rowspan='2' style='font-size:2em;'>N/A</td></tr>"
            );
            tbodyTM.append(newRow);
        } else {
        for (var i = 0; i < results.length; i++) {
            var tbodyTM = $("#tomorrows-matches");
            var newRow = $(
                "<tr><td>" + results[i].home_team.code + "</td><td> vs </td><td>"
                + results[i].away_team.code + "</td></tr>"
            );
            tbodyTM.append(newRow);
        }
    }
    });
    yesterdaysMatches();
}

//Yesterday's Score
function yesterdaysMatches() {
    var queryURL3 = "https://worldcup.sfg.io/matches"

    $.ajax({
        url: queryURL3,
        method: "GET"
    }).then(function(response) {
        //console.log(queryURL3);
        console.log('Yesterdays Matches');
        var results = response;
        console.log(results);
        //filling in null with n/a
        if(results.length === 0) {
            var tbodyYM = $("#yesterdayMatch");
            var newRow = $(
                "<tr><td colspan='3' rowspan='2' style='font-size:2em;'>N/A</td></tr>"
            );
            tbodyTM.append(newRow);
        } else {
            for (var i = 0; i < results.length; i++) {
                var date = results[i].datetime;         //2018-06-28T14:00:00Z
                var sliced = date.slice(0,10);          //2018-06-28
                var slicedFormat = "YYYY-MM-DD";
                var convertSliced = moment(sliced, slicedFormat);
                //console.log(moment(convertSliced).format("YYYY-MM-DD"))
                //console.log(moment(convertSliced).format("MM/DD/YY"));
                var currentDate = moment();
                //console.log(moment(currentDate).format("YYYY-MM-DD"));
                var diffconvertSliced = moment(currentDate, "YYYY-MM-DD").subtract(1, "days");
                //console.log(moment(diffconvertSliced).format("YYYY-MM-DD"));

                tbodyYM = $("#yesterdayMatch");
                var newRow = $(
                    "<tr><td>" + results[i].home_team.code + " | " + results[i].home_team.goals + "</td><td>"
                    + results[i].away_team.code + " | " + results[i].away_team.goals + "</td><td>" + results[i].winner + "</td></tr>"
                );

                if ((moment(convertSliced).format("YYYY-MM-DD")) === (moment(diffconvertSliced).format("YYYY-MM-DD"))) {
                    //console.log(this);
                    tbodyYM.append(newRow);
                }
            }
        }
    });
    teamList();
}

//Teams dropdown
function teamList() {
    var queryURL4 = "https://worldcup.sfg.io/teams/"

    $.ajax({
        url: queryURL4,
        method: "GET"
    })
    .then(function(response) {
        var results = response;
        console.log("Team List");
        console.log(results);

        for (var i=0; i< results.length; i++){
            //console.log(results[i].country);


        }

            for(var j=0; j<results.length; j++){
          
                var countryList = $("#your-team");
                // var newList = $("<li><a class='dropdown-item teamselect' id = '" + results[i].fifa_code + "' href='#follow-teams'>"+ results[i].country + "</a></li>");

                
               var button= $(".team-buttons").append("<button class='btn btn-primary' type='button' onclick= 'gotTeamName('"+results[j].fifa_code+"')>"+results[j].country+"</button>"); 
               $(button).on("click", function(){
                   window.open('teampage.html?TeamName=' +results[j].fifa_code);
                   console.log(button);
               });
                console.log(results[j].country);
                console.log(results[j].fifa_code);
               
               
                
              
            }

           
             function gotTeamName(button) {	
                var code = results[j].fifa_code;
                
                //window.open('https://teampage.html?TeamName=' + encodeURIComponent(teamName))
                window.open('teampage.html?TeamName=' + encodeURIComponent(button));        
                gotTeamName(results[i].country.Australia);
                // console.log(gotTeamName);
            }	

        
    });
}

//Refresh the Current Game Data
setInterval(function refreshScores() {
        var queryURL = "https://worldcup.sfg.io/matches/today";
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            //console.log(queryURL);
            //console.log(response);
            var results = response;
    
            for (var i = 0; i < results.length; i++) {
                //clear the table before loading data
                $(".scoreRow-" + [i]).remove();
                //console.log(results[i]);
                //console.log(results[i].venue);
                //console.log(results[0].winner_code);
                
                //Check for null fields
                if(results[i].winner === null){
                    results[i].winner = "Game Ongoing";
                }
                if(results[i].time === null){
                    results[i].time = "Game Ongoing";
                }
                var tbodyCS = $("#currentScore");
                var newRow = $(
                    "<tr class='scoreRow-" + [i] + "'><td>" + results[i].time +"</td><td>" + results[i].home_team_country + "</td><td>" + 
                    results[i].home_team.goals + " || " + results[i].away_team.goals
                    + "</td><td>" + results[i].away_team_country + "</td><td>" 
                    + results[i].winner + "</td></tr>"
                );
                tbodyCS.append(newRow);
            }
        });
}, 10000);


//THIS IS FOR SCROLLING AND THE SMOOTHNESS TRANSITION OF NAVIGATION
$(document).ready(function(){
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {
  
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        var hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
     
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
    //start the API calls
    loadScore();
  });
