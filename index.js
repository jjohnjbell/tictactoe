// Waits for the window document to load before running javascript
window.onload = function () {
   
    //Grab graphic elements
    const googleEl = `<img src="images/google.jpg" height="100" width="100">`
    const chromeEl = `<img src="images/chrome.jpg" height="100" width="100">`

    // Select all elements with the role 'button'.
    let buttons = document.querySelectorAll("#tictactoe-btn");
    const buttonsElementArray = Array.from(buttons);

    // Add event listeners to each button using for-loops.
    for (let i = 0; i < buttonsElementArray.length; i++) {
        buttonsElementArray[i].addEventListener("click", function () {
            handleButtonClick(buttonsElementArray[i]);
        });
    }

    const messageElement = document.getElementById("message");
    const newButtonElement = document.getElementById("reset-btn");

  
    const winConditions = [
        // Horizontal Conditions
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Horizontal Conditions
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Cross Conditions
        [0, 4, 8],
        [2, 4, 6],
    ];


    let gameEnd = false;
    let player = "X"; // Keep track of current player
    let turnsPlayed = 0; // Keep track of total turns played
    resetGame();
  

    function handleButtonClick(button) {
        // Only run function if button is empty AND the game hasn't already ended.
        if (button.innerHTML === "" && gameEnd !== true) {
            if (player === "X") {
                button.innerHTML = googleEl
                player = "O";
            } else {
                button.innerHTML = chromeEl
                player = "X";
            }
           
            if ( player === "O"){
            messageElement.textContent = `Chrome's turn.`;
            }else{
            messageElement.textContent = `Google's turn.`;
            }
            turnsPlayed++;
        }
        // Only check win conditions if 5 or more turns have been played.
        if (turnsPlayed >= 5) {
            checkWinCondition();
        }
    
    }


    function checkWinCondition() {
        // Get the last player to make a move, so we can check if they won the game.
        let lastPlayer = "";
        if (player === "X") {
            lastPlayer = chromeEl;
        } else {
            lastPlayer = googleEl;
        }

        // If all 9 spots have been filled, then the game was a TIE.
        if (turnsPlayed === 9) {
            gameEnd = true;
            message.textContent = `Bummer. This game was a tie.`;
            for (let i = 0; i < buttonsElementArray.length; i++) {
                buttonsElementArray[i].style.background= "red"
            }
        }

        // Use array of win conditions and current player - "X" or "Y" to determine if a match is met.
        for (let i = 0; i < winConditions.length; i++) {
            // Inside win-conditions array | Max = 8
            let playerStreak = 0;
            for (let j = 0; j < winConditions[i].length; j++) {
                // Inside win-conditions array -> button-indexes-array | Max = 3
                // Check if these button indexes all have the textContent of the last player - "X" or "O".
                const buttonIndex = winConditions[i][j];
                if (buttonsElementArray[buttonIndex].innerHTML === lastPlayer) {
                    playerStreak++;
                    buttonsElementArray[buttonIndex].style.background= "green"
             
            }
            // If there matches in a winCondition, then the last player wins.
            if (playerStreak === 3) {
                gameEnd = true;
              
                if (lastPlayer === chromeEl){
                message.innerHTML = `Congratulations. Chrome's our WINNER!`;
                }else{
                message.innerHTML = `Congratulations. Google's our WINNER!`;
                } 
            }
        }
    }
    }


    // Call the function resetGame instead of clearBoard because it does more than just clearning the board, it resets the game state as well.
    function resetGame() {
        gameEnd = false;
        player = "X";
        turnsPlayed = 0;
        messageElement.textContent = "";
        // Improvement: Let the players know which turn it is.
        messageElement.innerHTML = `Google's turn.`;

        // Use the button array to reset all text to blank strings.
        for (let i = 0; i < buttonsElementArray.length; i++) {
            buttonsElementArray[i].innerHTML = "";
            buttonsElementArray[i].style.background= "white"
        }
    }





    newButtonElement.addEventListener("click", function () {
        gameEnd = false;
        player1Turn = true;
        resetGame();
    });


} // Close window onload function
