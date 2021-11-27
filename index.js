// Waits for the window document to load before running javascript
window.onload = function () {
    /*
        Code Review - Michael Cowan
        NOTE: Comments are strictly to explain the thought process. Regularly code wouldn't be written like this.
        NOTE: I also chaneded the CSS and HTML files to match new ID's and variable names.


        Issue 0: While some variable names are obvious in context, they aren't declarative without context.
        Solution: Use declarative variable names or appropriate shortenings, shortening variable names !== better/faster code.
        (As long as they don't become sentences).
        Action(s): 
            - use industry standard shortenings for common elements. Example: "button" => "btn" or "table" => "tbl".
            - using the full name for elements. Example: "mess" => "message".
            - specify if the variable actually stores the element or element value. Example: "message" => "messageElement".
        
        Issue 1: A lot of repetition is done throughout the code statically, meaning the code isn't maintainable or scalable.
        Solution: Use a data structure like an array or list to save similar elements/values and loop over them instead.
        Action(s): 
            - create arrays for groups of relative variables/elements. Example: The "winConditions" array.
            - use for-loops or array-loops to run similar operations multiple times.
  
        Issue 2: Save computation time.
        Solution: Look for more opportunities for if-statements. Don't run code if it doesn't have to. 
        Action(s):
            - there's no reason to check if someone won if they were only 4 turns. 5 turns are needed minimum to win a game.
            - let the player know the game ended when the last possible move or all 9 spots have been entered.
            - 
  
        Issue 3: Possible layout shifting.
        Solution: I didn't test it, but changing the font size of the elements shouldn't be necessary if you just set the innerText to an empty string.
    */

    // const but1 = document.getElementById("a1")
    // const but2 = document.getElementById("a2")
    // const but3 = document.getElementById("a3")
    // const but4 = document.getElementById("a4")
    // const but5 = document.getElementById("a5")
    // const but6 = document.getElementById("a6")
    // const but7 = document.getElementById("a7")
    // const but8 = document.getElementById("a8")
    // const but9 = document.getElementById("a9")

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

    /* 
        Since buttons are stored in an array now, we'll use the array indexes to identify buttons to win conditions.
        (Instead of their variable names, which no longer exist)
        Image the array relative to the tic-tac-toe grid as such:
        
         0 | 1 | 2  
        ---+---+---
         3 | 4 | 5   
        ---+---+---
         6 | 7 | 8  
    */

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

    let player1Turn = true;
    let gameEnd = false;
    let player = "X"; // Keep track of current player
    let turnsPlayed = 0; // Keep track of total turns played
    resetGame();
    // clearBoard();

    // function renderGame(butt) {
    //     if (butt.innerText != "") {
    //         if (player1Turn) {
    //             butt.innerText = "X"
    //             butt.style.fontSize = "40px"
    //             player1Turn = false
    //         } else {
    //             butt.innerText = "O"
    //             butt.style.fontSize = "40px"
    //             player1Turn = true
    //         }
    //     }
    //     checkWinner()
    // }

    function handleButtonClick(button) {
        // Only run function if button is empty AND the game hasn't already ended.
        if (button.innerText === "" && gameEnd !== true) {
            if (player === "X") {
                button.innerText = "X";
                player = "O";
            } else {
                button.innerText = "O";
                player = "X";
            }
            messageElement.textContent = `Player ${player}'s turn.`;
            turnsPlayed++;
        }
        // Only check win conditions if 5 or more turns have been played.
        if (turnsPlayed >= 5) {
            checkWinCondition();
        }
    }

    // function checkWinner() {
    //     if (((but1.textContent === but2.textContent) && (but2.textContent === but3.textContent)) ||
    //         ((but4.textContent === but5.textContent) && (but5.textContent === but6.textContent)) ||
    //         ((but7.textContent === but8.textContent) && (but8.textContent === but9.textContent)) ||

    //         ((but1.textContent === but4.textContent) && (but4.textContent === but7.textContent)) ||
    //         ((but2.textContent === but5.textContent) && (but5.textContent === but8.textContent)) ||
    //         ((but3.textContent === but6.textContent) && (but6.textContent === but9.textContent)) ||

    //         ((but1.textContent === but5.textContent) && (but5.textContent === but9.textContent)) ||
    //         ((but3.textContent === but5.textContent) && (but5.textContent === but7.textContent))) {

    //         gameEnd = true
    //         message.textContent = "Congratulations"
    //     } else {
    //         gameEnd = false
    //     }
    // }

    function checkWinCondition() {
        // Get the last player to make a move, so we can check if they won the game.
        let lastPlayer = "";
        if (player === "X") {
            lastPlayer = "O";
        } else {
            lastPlayer = "X";
        }

        // If all 9 spots have been filled, then the game was a TIE.
        if (turnsPlayed === 9) {
            gameEnd = true;
            message.textContent = `Bummer. This game was a tie.`;
        }

        // Use array of win conditions and current player - "X" or "Y" to determine if a match is met.
        for (let i = 0; i < winConditions.length; i++) {
            // Inside win-conditions array | Max = 8
            let playerStreak = 0;
            for (let j = 0; j < winConditions[i].length; j++) {
                // Inside win-conditions array -> button-indexes-array | Max = 3
                // Check if these button indexes all have the textContent of the last player - "X" or "O".
                const buttonIndex = winConditions[i][j];
                if (buttonsElementArray[buttonIndex].textContent === lastPlayer) {
                    playerStreak++;
                }
            }
            // If there matches in a winCondition, then the last player wins.
            if (playerStreak === 3) {
                gameEnd = true;
                message.textContent = `Congratulations. Player ${lastPlayer} Wins!`;
            }
        }
    }

    // but1.addEventListener("click", function () {
    //     renderGame(but1)
    // })
    // but2.addEventListener("click", function () {
    //     renderGame(but2)
    // })
    // but3.addEventListener("click", function () {
    //     renderGame(but3)
    // })
    // but4.addEventListener("click", function () {
    //     renderGame(but4)
    // })
    // but5.addEventListener("click", function () {
    //     renderGame(but5)
    // })
    // but6.addEventListener("click", function () {
    //     renderGame(but6)
    // })
    // but7.addEventListener("click", function () {
    //     renderGame(but7)
    // })
    // but8.addEventListener("click", function () {
    //     renderGame(but8)
    // })
    // but9.addEventListener("click", function () {
    //     renderGame(but9)
    // })

    // function clearBoard() {
    //     mess.textContent = ""

    //     but1.textContent = "z"
    //     but1.style.fontSize = "0px"

    //     but2.textContent = "q"
    //     but2.style.fontSize = "0px"

    //     but3.textContent = "w"
    //     but3.style.fontSize = "0px"

    //     but4.textContent = "e"
    //     but4.style.fontSize = "0px"

    //     but5.textContent = "r"
    //     but5.style.fontSize = "0px"

    //     but6.textContent = "t"
    //     but6.style.fontSize = "0px"

    //     but7.textContent = "l"
    //     but7.style.fontSize = "0px"

    //     but8.textContent = "k"
    //     but8.style.fontSize = "0px"

    //     but9.textContent = "t"
    //     but9.style.fontSize = "0px"
    // }

    // Call the function resetGame instead of clearBoard because it does more than just clearning the board, it resets the game state as well.
    function resetGame() {
        gameEnd = false;
        player = "X";
        turnsPlayed = 0;
        messageElement.textContent = "";
        // Improvement: Let the players know which turn it is.
        messageElement.textContent = `Player ${player}'s turn.`;

        // Use the button array to reset all text to blank strings.
        for (let i = 0; i < buttonsElementArray.length; i++) {
            buttonsElementArray[i].textContent = "";
        }
    }

    newButtonElement.addEventListener("click", function () {
        gameEnd = false;
        player1Turn = true;
        resetGame();
    });
}; // Close window onload function
