var buttonColours =  ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var lastAnswer =[];
// when i click on button
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1)

});

function nextSequence() {
userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour); 
    level ++
    $("#level-title").text("level " + level)

}

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// animation on pressed
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
    
}

// start the game
var started = false;
var level = 0;

$(document).keypress(function () {
   if (!started) {
    $("#level-title").text("level " + level)
    nextSequence()
        started = true;
}

})
$(".btn-start").click(function () {
    if (!started) {
     $("#level-title").text("level " + level)
     nextSequence()
         started = true;
 }
 
 })

// Check Answer

function checkAnswer(currentLevel) {

if (gamePattern[currentLevel] === userClickedPattern[currentLevel] ) {
    console.log("Sucess");
    if(gamePattern.length === userClickedPattern.length){
        
        setTimeout(function() {
            nextSequence()
          }, "1000")

    }
}else {
    startOver()
    $("body").addClass("game-over")
    $("#level-title").text("Game Over, Press Any Key to Restart");
    var wrongSound = new Audio('sounds/wrong.mp3');
    wrongSound.play();
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
}    
}

// StartOver

function startOver() {
    gamePattern =[];
    started = false;
    level = 0;


}
