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
    $("#food-image").attr("src", "images/level" + levelNumber + ".jpg") // Changes food-image
					.animate({opacity: '1'}, {queue: false, duration: 600})
					.animate({top: '0'}, {queue: false, duration: 400});
}

//////// FINAL SCORE PAGE

function writeFinalScorePage() {
	$("body").html("<section class='final-score'></section><section class='correct-foods'></section><section class='incorrect-foods'></section>")
			 .css("opacity", "0");
	$(".final-score").html("<h1>Food Quiz</h1><h6>Created by Yana Nasakin</h6><h4>Final Score:</h4><div class='score-box'><span id='large'>" + score +"</span> / 10</div><div id='play-again'>Play Again</div>");
	$("#play-again").on("click", playAgain);
	$(".correct-foods").html("<h4 class='list'>Correct:</h4><ul id='correct-list'></ul>");
	$(".incorrect-foods").html("<h4 class='list'>Incorrect:</h4><ul id='incorrect-list'></ul>")
	writeFoodList();
	$("body").animate({opacity: '1'}, 750);
}

function writeFoodList() {
	$.each(correctFoods, function(i) {
		$("<li/>").text(correctFoods[i]).appendTo($("ul#correct-list"));
	});
	$.each(incorrectFoods, function(i) {
		$("<li/>").text(incorrectFoods[i]).appendTo($("ul#incorrect-list"));
	});
	$("section ul li").css({'opacity': '0', 'line-height': '0'})
					  .animate({opacity: '1'}, {queue: false, duration: 1500})
					  .animate({'line-height': '25px'}, {queue: false, duration: 1000})
}

function playAgain() {
	levelNumber = 1;
	score = 0;
	correctFoods = [];
	incorrectFoods = [];
	writeEmptyLevel();
	writeLevel();
}

function writeEmptyLevel() {
	$("body").html("<header></header><div class='food-container'></div><ul class='button-container'></ul><footer></footer>");
	$("header").html("<h3 id='level'>Level 1</h3><h3 id='score'>Score: 0 / 10</h3>");
	$(".food-container").html("<img src='images/level1.png' id='food-image'>");
}
