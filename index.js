// Waits for the window document to load before running javascript
window.onload = function () {

    const but1 = document.getElementById("a1")
    const but2 = document.getElementById("a2")
    const but3 = document.getElementById("a3")
    const but4 = document.getElementById("a4")
    const but5 = document.getElementById("a5")
    const but6 = document.getElementById("a6")
    const but7 = document.getElementById("a7")
    const but8 = document.getElementById("a8")
    const but9 = document.getElementById("a9")
    const mess = document.getElementById("message")
    const newBut = document.getElementById("new")


    let gameEnd = false
    let player1Turn = true
    clearBoard()

function renderGame(butt){
    if (butt.innerText != ""){
        if (player1Turn){
            butt.innerText = "X"
            butt.style.fontSize="40px"
            player1Turn = false
        }else{
            butt.innerText="O"
            butt.style.fontSize="40px"
            player1Turn = true
            }
        }
        checkWinner() 
    
}

function checkWinner(){
if (     ((but1.textContent === but2.textContent) && (but2.textContent === but3.textContent)) ||
         ((but4.textContent === but5.textContent) && (but5.textContent === but6.textContent)) ||
         ((but7.textContent === but8.textContent) &&  (but8.textContent === but9.textContent)) ||
     
         ((but1.textContent === but4.textContent) &&  (but4.textContent === but7.textContent)) ||
         ((but2.textContent === but5.textContent) &&  (but5.textContent === but8.textContent)) ||
         ((but3.textContent === but6.textContent) &&  (but6.textContent === but9.textContent)) ||

         ((but1.textContent === but5.textContent) &&  (but5.textContent === but9.textContent)) ||
         ((but3.textContent === but5.textContent) &&  (but5.textContent === but7.textContent))  ){

           gameEnd= true
           mess.textContent = "Congratulations"
           }  else {
           gameEnd = false
           }
    }


    but1.addEventListener("click", function(){
        renderGame(but1)  
    })
    but2.addEventListener("click", function (){
        renderGame(but2)
    })
    but3.addEventListener("click", function (){
        renderGame(but3)
    })
    but4.addEventListener("click", function (){
        renderGame(but4)
    })
    but5.addEventListener("click", function (){
        renderGame(but5)
    })
    but6.addEventListener("click", function (){
        renderGame(but6)
    })
    but7.addEventListener("click", function (){
        renderGame(but7)
    })
    but8.addEventListener("click", function (){
        renderGame(but8)
    })
    but9.addEventListener("click", function (){
        renderGame(but9)
    })

    function clearBoard(){
        mess.textContent=""

        but1.textContent="z"
        but1.style.fontSize = "0px"

        but2.textContent="q"
        but2.style.fontSize = "0px"

        but3.textContent="w"
        but3.style.fontSize = "0px"

        but4.textContent="e"
        but4.style.fontSize = "0px"

        but5.textContent="r"
        but5.style.fontSize = "0px"

        but6.textContent="t"
        but6.style.fontSize = "0px"

        but7.textContent="l"
        but7.style.fontSize = "0px"

        but8.textContent="k"
        but8.style.fontSize = "0px"

        but9.textContent="t"
        but9.style.fontSize = "0px"
    }
    newBut.addEventListener("click",function(){
        gameEnd=false
        player1Turn = true
        clearBoard()
       
    })


}//close main tag




