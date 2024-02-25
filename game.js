
var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var gameStarted = false;


$(document).keypress(function () {
  if (!gameStarted) {
    startGame();
  }
});

$(document).click(function () {
  if (!gameStarted) {
    startGame();
  }
});

function startGame() {
  gameStarted = true;
  $("#level-title").text("Level 0");
  nextSequence();
}




//$(document).keypress(function () {
  //if (!gameStarted) {
    //gameStarted = true;
    //$("#level-title").text("Level 0");
    //nextSequence();
  //}
//});


function nextSequence() {

  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $('#' + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  level++;
  $("#level-title").text("Level " + level);
};

$(document).ready(function () {
  $(".btn").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  })
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

function animatePress(name) {
  $('#' + name).addClass("pressed");
  setTimeout(function () {
    $('#' + name).removeClass("pressed");
  }, 100);
};

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    var audio = new Audio("sounds/" + "wrong.mp3");
  audio.play();
  $('body').addClass("game-over ");
  setTimeout(function () {
    $('body').removeClass("game-over ");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
  }
};



function startOver(){
level = 0;
userClickedPattern = [];
gamePattern = [];
gameStarted = false;
};
