//Current Score
var queryURL = "https://worldcup.sfg.io/matches/today";

$.ajax({
    url: queryURL,
    method: "GET"
})
.then(function(response) {
    console.log(queryURL);
    console.log(response);
    var results = response;

    for (var i = 0; i < results.length; i++) {
        //console.log(results[i]);
        //console.log(results[i].venue);
        console.log(results[0].winner_code);
        var tbodyCS = $("#currentScore");
        var newRow = $(
            
            "<tr><td>" + results[i].time+"</td><td>" + results[i].home_team_country + "</td><td>" + 
            results[i].home_team.goals + " || " + results[i].away_team.goals
            + "</td><td>" + results[i].away_team_country + "</td><td>" 
            + results[i].winner + "</td></tr>"
        );
        tbodyCS.append(newRow);
        $(".placeholder").css("background-color", "white");

        if(results[i].winner === null){
            results[i].winner.append("Game Ongoing");
        }
    }
    
    

});


//Tomorrow Score
var queryURL2 = "https://worldcup.sfg.io/matches/tomorrow/?by_date=DESC";

$.ajax({
    url: queryURL2,
    method: "GET"
})
.then(function(response) {
    console.log(queryURL2);
    console.log(response);
    var results = response;

    for (var i = 0; i < results.length; i++) {
        var tbodyTM = $("#tomorrowMatch");
        var newRow = $(
            "<tr><td>" + results[i].home_team.code + "</td><td> vs </td><td>"
            + results[i].away_team.code + "</td></tr>"
        );
        tbodyTM.append(newRow);
        $(".placeholder").css("background-color", "white");
    }
});


//Yesterday Score
var queryURL3 = "https://worldcup.sfg.io/matches"

$.ajax({
    url: queryURL3,
    method: "GET"
})
.then(function(response) {
    console.log(queryURL3);
    console.log(response);
    var results = response;

    for (var i = 0; i < results.length; i++) {
        var date = results[i].datetime;         //2018-06-28T14:00:00Z
        var sliced = date.slice(0,10);          //2018-06-28
        var slicedFormat = "YYYY-MM-DD";
        var convertSliced = moment(sliced, slicedFormat);
        console.log(moment(convertSliced).format("YYYY-MM-DD"))
        //console.log(moment(convertSliced).format("MM/DD/YY"));
        var currentDate = moment();
        //console.log(moment(currentDate).format("YYYY-MM-DD"));
        var diffconvertSliced = moment(currentDate, "YYYY-MM-DD").subtract(1, "days");
        console.log(moment(diffconvertSliced).format("YYYY-MM-DD"));

        tbodyYM = $("#yesterdayMatch");
        var newRow = $(
            "<tr><td>" + results[i].home_team.code + " | " + results[i].home_team.goals + "</td><td>"
            + results[i].away_team.code + " | " + results[i].home_team.goals + "</td><td>" + results[i].winner + "</td></tr>"
        );

        if ((moment(convertSliced).format("YYYY-MM-DD")) === (moment(diffconvertSliced).format("YYYY-MM-DD"))) {
            tbodyYM.append(newRow);
        }

    }
});



var queryURL4 = "https://worldcup.sfg.io/teams/"

$.ajax({
    url: queryURL4,
    method: "GET"
})
.then(function(response) {
    console.log(queryURL4);
    console.log(response);
    var results = response;

    for (var i=0; i< results.length; i++){
        console.log(results[i].country);
        var countryList = $("#your-team");
        var newList = $("<a id = '" + results[i].fifa_code + "' href='teampage.html'>"+ results[i].country + "</a><br>");
        
        countryList.append(newList);
        $(".placeholder").css("background-color", "white");
    }

    
});

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
  });