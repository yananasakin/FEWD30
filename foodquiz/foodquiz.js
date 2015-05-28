var levelNumber = 1;
var score = 0;

var foods = {
      "Index [0]" : {},

      "Ceviche" : {
          Origin: "South American, Spanish",
      },

      "Shakshouka": {
          Origin: "North Africa",
      },

      "Fesenjan": {
          Origin: "Iran",
      },

      "Carpaccio": {
          Origin: "Italy",
      },

      "Goulash": {
          Origin: "Central Europe, Hungary",
      },

      "Bibimbap": {
          Origin: "Korea",
      },

      "Pelmeni" : {
          Origin: "Russia",
      },

      "Chilaquiles": {
          Origin: "Mexico",
      },

      "Okinomiyaki": {
          Origin: "Japan",
      },

      "Hachis Parmentier" :{
          Origin: "France",
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
var correctFoods = [];
var incorrectFoods = [];

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
	for (var i = 0; i<6; i++) {
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
	$("ul.button-container li").eq(Math.floor(Math.random()*6)).text(foodAnswers[levelNumber]) //// Writes food name of correct answer for current level
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
	correctFoods.push(foodAnswers[levelNumber]);
	// showInfo(foodAnswers[levelNumber]);
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
	incorrectFoods.push(foodAnswers[levelNumber]);
	// showInfo(foodAnswers[levelNumber]);
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

//////// LEVEL APPEARANCE AFTER CLICK EVENT ////////

function scoreIncrease() {
	score++;
    $("#score").text("Score: " + score + " / 10");
}

// function showInfo(foodorigin) {
// 	var foodQuery = $("#correct").text().split(" ").join("+")
// 	$("footer").html("<div id='info'></div><div class='footer-button' id='next'>Next Level ></div><a class='footer-button' id='see-food' target='_blank' href='https://www.google.com/search?q=" + foodQuery + "'>See Dish</a>")
// 	           .css({'opacity': '0'});
// 	$("#info").html("<p><span class='bold'>Name: </span>" + foodorigin + "</p>
//   <p><span class='bold'>Food Origin: </span>" + foods[foodname] </p>");
// 	$("#next").on("click", writeNextLevel);
// 	$("footer").animate({opacity:'1'}, 300);
// }
