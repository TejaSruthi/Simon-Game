var userClickedPattern = [];
var gamePattern = [];
var started = false;
var level = 0;


var buttonColours = ["red", "blue", "green", "yellow"];

$(document).keypress(function(event) {
  if(!started)
      nextSequence();
      started=true;
});

function startOver(){
  gamePattern=[];
  level=0;
  userClickedPattern = [];
  started=false;
}

function checkAnswer(currentLevel) {
  var flag = 0;
  for (var i = 0; i < currentLevel; i++) {
    if (userClickedPattern[i] != gamePattern[i]) {
      flag = 1;
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200)
      playSound("wrong");
      $("#level-title").html("Game Over, Press Any Key to Restart");
      startOver();
      break;
    }
  }
  if (flag == 0) {
    if (currentLevel == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  }
}

function nextSequence() {
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#level-title").html("Level " + level);
  $("." + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length);
  playSound(userChosenColor);
  animatePress(userChosenColor);
});


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed")
  }, 100);
}
