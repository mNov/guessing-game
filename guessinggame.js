var randomNum = Math.floor((Math.random() * 100) + 1);
var numGuessesLeft = 5;
var guessedNums = [];

$(document).ready(function() {
    $("#guess").focus();    
    $("#submitguess").click(function() {
        
        $("#infoplace").css("color", "#3D1400");

        var userGuess = parseInt($("#guess").val(), 10);
        $("#guess").val("");


        if (isNaN(userGuess)) {
            $("#infoplace").text("That is not a number! Try again!");
        }
        else if (userGuess < 1 || userGuess > 100) {
            $("#infoplace").text("The number must be in the range 1-100!");
        }
        else if (guessedNums.indexOf(userGuess) != -1) {
            $("#infoplace").text("You already guessed that number! Try again!");
        }

        else { //if none of the above options are true, then the guess was valid
            
            numGuessesLeft--;

            $("#numGuessesLeft").text(numGuessesLeft);
            guessedNums.push(userGuess);
            $("#guessedSoFar").text(guessedNums.toString());

            if(numGuessesLeft == 1) {
                $("#grammar").text("guess");
            }
            else if (numGuessesLeft == 0) {
                $("#grammar").text("guesses");
            }


            if (randomNum == userGuess) {
                    $("#infoplace").text("You guessed the correct number!!! :-)");
                    $("body").css("background-color", "gold");
            }
            else if (numGuessesLeft == 0 && randomNum != userGuess)  {                
                $("#infoplace").text("You ran out of guesses! Click the reset button to start a new game. (Btw, the answer was " + (randomNum) + ".)");
            }
            else {

                var diff = Math.abs(randomNum - userGuess);  
                
                if (diff <= 5) {
                    $("#infoplace").css("color", "red");
                    $("#infoplace").text("You're burning!");
                }
                else if (diff <= 10) {
                    $("#infoplace").css("color", "firebrick");
                    $("#infoplace").text("You're hot!");
                }
                else if (diff <= 20) {
                    $("#infoplace").css("color", "darkred");
                    $("#infoplace").text("You're warm!");
                }
                else if (diff <= 50) {
                    $("#infoplace").css("color", "blue");
                    $("#infoplace").text("You're cold!");
                }
                else {
                    $("#infoplace").css("color", "skyblue");
                    $("#infoplace").text("You're freezing!");
                }
                if (randomNum > userGuess) {
                    $("#infoplace").append(" Guess higher!");
                }
                else {
                    $("#infoplace").append(" Guess lower!");
                }                                    
            }
        }

        event.preventDefault();
        
    });
    $("#gethint").click(function() {
        $("#infoplace").text(function() {
            var randLower = Math.floor((Math.random() * 5) + 1);
            var randHigher = Math.floor((Math.random() * 5) + 1);
            return "Here's a hint! The answer is somewhere in this range: [" + (randomNum-randLower) + "," + (randomNum+randHigher) +"]";
        });

    });
    $("#resetgame").click(function() {
       $("#infoplace").empty();
       $("#infoplace").css("color", "#3D1400");
       numGuessesLeft = 5;
       $("#numGuessesLeft").text(numGuessesLeft);
       $("#grammar").text("guesses");
       randomNum = Math.floor((Math.random() * 100) + 1);
       $("#guessedSoFar").empty();
       guessedNums = [];
       $("body").css("background-color", "#80a");
    });
});