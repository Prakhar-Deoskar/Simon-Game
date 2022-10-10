var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

// trigger next nextSequence

function nextSequence() {
  level++;
  userClickedPattern = [];
  $("#level-title").text("Level : " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100); // $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);  //this is what is written in Angela's code but somehow I'm not okay with it
  playSound(randomChosenColor);

}

// button clicks

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id"); //this will store the id of the button that got clicked
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.lastIndexOf(userChosenColour));
})

// button animation

function animatePress(currentColor) {
  // var colorPressed = $("." + currentColor);  //tried this way by creating a variable and then adding class, but the below is more handy and short
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// ----first time keydown

// $(document).keypress(function(event) {
//   if (event.key == "a") {
//     nextSequence();
//   }
// });   // this is what I wrote, but the below one will work better.

var started = false;
var level = 0;


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level : " + level);
    nextSequence();
    started = true;
  }
})

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // console.log("success");
    var count = 0;
    for (var i = 0; i < gamePattern.length; i++) {
      if (gamePattern[i] === userClickedPattern[i]) {
        count++;
      }
    }
    if (count === gamePattern.length) {
      console.log("success");
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    startOver();
  }
}


function startOver() {
  var audio = new Audio("sounds/wrong.mp3")
  audio.play();
  level = 0;
  gamePattern = [];
  started = false;
  $("h1").text("Game Over, Press any key to start");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 500);
}


function myFunction(){
  document.getElementById("myDropdown").classList.toggle("show");
}


window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
