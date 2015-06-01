var levelNumber = 1;
var score = 0;

var foods = {
      "Index [0]" : {},

      "Ceviche" : {
          Origin: "South American, Spanish",
          Recipe:"http://www.cookincanuck.com/2014/04/tequila-spiked-shrimp-ceviche-recipe-avocado/",

      },

      "Shakshouka": {
          Origin: "North Africa",
          Recipe:"http://www.feveravenue.com/",

      },

      "Fesenjan": {
          Origin: "Iran",
          Recipe:"http://persianmama.com/chicken-in-walnut-pomegranate-sauce-khoresht-fesenjan/",
      },

      "Carpaccio": {
          Origin: "Italy",
          Recipe:"http://doriannn.blogspot.de/2013/10/tartare-et-carpaccio-et-si-limportant.html",
      },

      "Goulash": {
          Origin: "Central Europe, Hungary",
          Recipe: "http://thewanderlustkitchen.com/german-goulash/",

      },

      "Bibimbap": {
          Origin: "Korea",
          Recipe: "http://foodiesfeed.com/korean-bibimbap-in-yamyam-berlin/",
      },

      "Pelmeni" : {
          Origin: "Russia",
          Recipe: "http://www.kitchenrussian.com/articles/view/27",
      },

      "Chilaquiles": {
          Origin: "Mexico",
          Recipe: "http://minimalistbaker.com/chipotle-tofu-chilaquiles/#_a5y_p=2521107",
      },

      "Okinomiyaki": {
          Origin: "Japan",
          Recipe: "http://www.closetcooking.com/2011/10/okonomiyaki-hiroshima-style.html",
      },

      "Hachis Parmentier" :{
          Origin: "France",
          Recipe: "http://www.makingthymeforhealth.com/2014/03/09/vegan-lentil-shepherds-pie/",
      }
}

var foodAnswers = Object.keys(foods);

var foodPool = [
    "Ceviche",
    "Shakshouka",
    "Fesenjan",
    "Carpaccio",
    "Goulash",
    "Bibimbap",
    "Pelmeni",
    "Chilaquiles",
    "Okinomiyaki",
    "Hachis Parmentier",
    "Paella",
    "Sashimi",
    "Bibimbap",
    "Fallafel",
    "Taboulli",
    "Shashlik Kebap",
    "Mandu",
    "Roti",
    "Beef Bourguignon",
    "Gnocchi",
    "Bruschetta",
    "Börek",
    "Shnitzel",
    "Khachapuri",
    "Kim Bap",
    "Kimchi",
    "Kalbi Beef",
    "Piroshki",
    "Baozi",
    "Aguachiles",
    "Enchiladas",
    "Chalupas",


];

var usedFoods = [];

$(document).ready(function(){
      writeLevel();
} )

function writeLevel() {
      if (levelNumber === 11) {
            writeFinalScorePage();
      } else {
          writeButtons();
          writeCorrectButton();
      }
}

function inArray (item, array) {
      var count = array.length || 1;
      for (var i=0; i<count; i++) {
          if (array[i] === item) {
              return true;
          }
      }
      return false;
}

//// Writes all buttons at random
function writeButtons() {
	for (var i = 0; i<4; i++) {
		var foodRandom = foodPool[Math.floor(Math.random()*foodPool.length)]; //// Chooses dish name at random
		while (foodRandom === foodAnswers[levelNumber] || inArray(foodRandom, usedFoods) === true) { //// Conditions that need to be met before a dish name is written into a button
			foodRandom = foodPool[Math.floor(Math.random()*foodPool.length)]; //// If conditions aren't met, then dish name is generated again
		}
		$("ul.button-container").append("<li class='button'>" + foodRandom + "</li>"); //// Appends new <li> with generated dish name
		usedFoods.push(foodRandom); //// Puts dish name into list for later comparison
	}
	$("ul.button-container li").on("click", answerWrong) //// Sets all <li> with "answerWrong" on click event
			  				   .on("click", colorWrong); //// Sets all <li> with "colorWrong" on click event
}

//// Overwrites one of the six "li" at random with the correct answer
function writeCorrectButton() {
	$("ul.button-container li").eq(Math.floor(Math.random()*4)).text(foodAnswers[levelNumber]) //// Writes food name of correct answer for current level
											  .attr("id", "correct") //// Sets this button as the correct button
											  .off("click", colorWrong) //// Turns off "colorWrong" click event set previously
											  .off("click", answerWrong) //// Turns off "answerWrong" click event set previously
											  .on("click", answerCorrect); //// Sets button with "answerCorrect" click event
}

//////// When CORRECT BUTTON is clicked ////////

// Button Function
function answerCorrect() {
	colorCorrect();
	turnOffAllButtons();
	showInfo(foodAnswers[levelNumber]);
	scoreIncrease();
}

// Button Appearance
function colorCorrect() {
    $("#correct").css("background", "rgb(94, 192, 0)"); // Highlights correct button
}


//////// When WRONG BUTTON is clicked ////////

// Button Function
function answerWrong() {
	turnOffAllButtons();
	showInfo(foodAnswers[levelNumber]);
}

// Button Appearance
function colorWrong() {
    $(this).css("background", "rgb(255, 111, 119)"); // Highlights selected incorrect button
    $("#correct").css("background", "rgb(94, 192, 0)"); // Highlights correct answer
}


///////// TURN BUTTON EVENT LISTENERS OFF ////////

function turnOffAllButtons() {
	$("#correct").off("click", answerCorrect);
	$("ul.button-container li").off("click", colorWrong);
	$("ul.button-container li").off("click", answerWrong);
}

//// LEVEL APPEARANCE AFTER CLICK EVENT ////////

function scoreIncrease() {
	score++;
    $("#score").text("Score: " + score + " / 10");
}

function showInfo(foodorigin) {
	var foodQuery = $("#correct").text().split(" ").join("+");
	$("footer").html(
    "<div id='info'></div>"+"<div class='footer-button' id='next'>Next Level</div>")
  .css({'opacity': '0'});
	$("#info").html("<p><span class='bold'>Origin: </span>" + foods[foodorigin].Origin + "</p>");
	$("#next").on("click", writeNextLevel);
	$("footer").animate({opacity:'1'}, 300);
}

//////// WRITE NEXT LEVEL ////////

function writeNextLevel() {
	levelNumber++;
	$("ul").html("");
	usedFoods = [];
	writeLevel();
	nextLevelAppearance();
}

function nextLevelAppearance() {
	$("footer").html(""); // Clears out footer
    $("#level").text("Level " + levelNumber); // Changes Level # shown on window
    $("#food-image").css({'opacity': '0', 'position': 'relative', 'top': '-75px'})
    $("#food-image").attr("src", "images/level" + levelNumber + ".png") // Changes food-image
					.animate({opacity: '1'}, {queue: false, duration: 600})
					.animate({top: '0'}, {queue: false, duration: 400});
}

//////// FINAL SCORE PAGE

function writeFinalScorePage() {
	$("body").html("<section class='final-score'></section>")
			 .css("opacity", "0");

	$(".final-score").html("<h1>Food Quiz</h1><h4>Final Score:</h4><div class='score-box'><span id='large'>" + score +"</span> / 10</div><div id='play-again'>Play Again</div>");
	$("#play-again").on("click", function(){
     window.location = "http://yananasakin.github.io/FEWD30/foodquiz/foodquiz.html";
});

  $("body").animate({opacity: '1'}, 750);
}
