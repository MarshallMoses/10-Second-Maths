//global vars
var currentProblem;

var minimum = 1;
var maximum = 10;

var timeAmount = 10;
var timeLeft = 10;

var currentScore = 0;
var highScore = 0;

var interval;



//function returns a random number between two integers
var randomNumber = function(min, max) {

  return Math.floor(Math.random() * (max - min) + min);

}


//write random equation and store text of equation and answer in an array
var writeEquation = function(min, max) {

  var output = {};

  var firstNum = randomNumber(min, max);
  var secondNum = randomNumber(min, max);

  output.answer = firstNum + secondNum;
  output.equation = String(firstNum) + " + " + String(secondNum);

  return output;

}

//generate new problem
var newProblem = function () {

  currentProblem = writeEquation(minimum, maximum);
  $(".equation").text(currentProblem.equation);


}

//update current score function
var updateScore = function (n) {

  currentScore += n;
  $(".currentScore").text(currentScore);

}

//check and update high score function
var updateHighScore = function () {

    highScore = currentScore;
    $(".highScore").text(currentScore);

}

// check answer
var checkAnswer = function (userInput, answer) {

  if(userInput === answer){
    newProblem();
    $("#answer").val("")
    updateTimer(1);
    updateScore(1);
  }

}


//update timer function
var updateTimer = function (n) {

  timeLeft += n;
  $(".timer").text(timeLeft);

}


//set timer initial value
var setTimer = function() {

  $(".timer").text(timeAmount);
  timeLeft = timeAmount;

}

var endGame = function () {

  if (currentScore > highScore) {

    alert("You set a new record! You scored " + currentScore + "!");
    updateHighScore();

  } else {

    alert("Game Over. You Scored " + currentScore + " points!");

  }

  setTimer();
  updateScore(-currentScore);
  $("#answer").val("");

}

//function to start game timer, 
var startGame = function () {

  if(!interval) {
    interval = setInterval(function () {

      updateTimer(-1);
      $('.timer').text(timeLeft);
    
      if(timeLeft === 0) {
    
        endGame();
        clearInterval(interval);
        interval = undefined;
    
      }
    
      }, 1000);
  }

}





//on document load do these things
$('document').ready(function(){

  setTimer();
  newProblem();

  $('#answer').on('keyup', function () {

    startGame();
    checkAnswer(Number($(this).val()), currentProblem.answer);
  
  });

});