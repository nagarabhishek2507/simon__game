var gamePattern =[];

var buttonArrays= ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var started=false;
var level=0;

$(document).keypress(function(){

  if(!started)
  {
    $("#level-title--").text("level" + level);
    nextSequence();
    started=true;
  }

});

$(".btn").click(function(){
    var userChosenColour =$(this).attr("id");
    userClickedPattern.push(userChosenColour);
 playSound(userChosenColour);
 animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
  {
    console.log("success");
    if(gamePattern.length===userClickedPattern.length)
    {
      setTimeout(function(){
      nextSequence();
    },1000);
  }
}

 else{
   console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 1000);

$("#level-title").text("Game Over: :press any key to start");
  startOver();

}

}

function nextSequence(){
userClickedPattern=[];

  level++;

  $("#level-title").text("level--"+ level);

var randomNumber=Math.floor(Math.random() * 4);
var randomChosenColour=buttonArrays[randomNumber];
   gamePattern.push(randomChosenColour);
   $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
 audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
