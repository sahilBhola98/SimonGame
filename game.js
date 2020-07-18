var buttonColours = ["red", "blue", "green", "yellow"]; //array to select colors from
var gamePattern = []; //empty array where the resultant colors will add as an array
var userClickedPattern = [];
var gameStart = false;
var level = 0;


function nextSequence() { //function that creates a random number for index
  userClickedPattern=[];
  level++;
  $("#level-title").text("LEVEL " + level);
  var randomNumber = Math.random();
  randomNumber = randomNumber * 4;
  randomNumber = Math.floor(randomNumber);
  var index = randomNumber;
  var randomChosenColor = buttonColours[index]; //selecting random color from colors available
  $("#" + randomChosenColor).fadeOut(200).fadeIn(200);
  playSound(randomChosenColor); //this will not play on normal autoplay song only plays with some human interaction
  gamePattern.push(randomChosenColor); //adding ot to resultant array

}
$(document).keydown(function(event) {
  if (gameStart === false) {
    nextSequence();
    gameStart = true;
  }
});
//whenever a button gets clicked at its id to userclicked array
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  if (gameStart === true) {
    userClickedPattern.push(userChosenColor);
  }
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAns(userClickedPattern.length - 1);
});

//playing audio function with color name
function playSound(name) {
  var audioPath = "sounds/" + name + ".mp3"
  var audioObj = new Audio(audioPath);
  audioObj.play();
}

//create flash animation when user clicks button
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}
//to check result
function checkAns(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence(), 1000);
    }
  }else {
      $("#level-title").text("Game-over, press any key to restart");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $(document).keydown(startOver());
    }
}
//to restart
function startOver(){
  $("#level-text").text("Press A Key to Start");
  level=0;
  gameStart=false;
  gamePattern=[];
}
